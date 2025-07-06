import { NextRequest, NextResponse } from 'next/server'

interface BrevoContact {
  email: string
  listIds?: number[]
  updateEnabled?: boolean
}

interface BrevoResponse {
  id?: number
  error?: string
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check for required environment variables
    const apiKey = process.env.BREVO_API_KEY
    const listId = process.env.BREVO_LIST_ID

    if (!apiKey || apiKey === 'your_brevo_api_key_here') {
      console.error('BREVO_API_KEY is not configured properly')
      return NextResponse.json(
        { error: 'Newsletter service is not configured. Please contact the administrator.' },
        { status: 500 }
      )
    }

    if (!listId || listId === 'your_list_id_here') {
      console.error('BREVO_LIST_ID is not configured properly')
      return NextResponse.json(
        { error: 'Newsletter service is not configured. Please contact the administrator.' },
        { status: 500 }
      )
    }

    // Prepare contact data for Brevo
    const contactData: BrevoContact = {
      email: email.toLowerCase().trim(),
      listIds: [parseInt(listId)],
      updateEnabled: true // This allows updating existing contacts
    }

    // Send request to Brevo API
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(contactData)
    })

    let responseData: BrevoResponse = {}
    
    // Handle different response scenarios based on status code
    if (brevoResponse.ok) {
      // Success cases
      if (brevoResponse.status === 201) {
        // Contact created - parse JSON response
        try {
          responseData = await brevoResponse.json()
          return NextResponse.json(
            { 
              message: 'Successfully subscribed to newsletter',
              contactId: responseData.id 
            },
            { status: 200 }
          )
        } catch (jsonError) {
          // Even if JSON parsing fails, 201 means success
          return NextResponse.json(
            { message: 'Successfully subscribed to newsletter' },
            { status: 200 }
          )
        }
      } else if (brevoResponse.status === 204) {
        // Contact updated/already exists - no response body expected
        return NextResponse.json(
          { message: 'Successfully subscribed to newsletter' },
          { status: 200 }
        )
      } else {
        // Other success status codes
        return NextResponse.json(
          { message: 'Successfully subscribed to newsletter' },
          { status: 200 }
        )
      }
    } else {
      // Error cases - try to parse error response
      try {
        const responseText = await brevoResponse.text()
        
        if (responseText.trim()) {
          responseData = JSON.parse(responseText)
        }
        
        if (brevoResponse.status === 401) {
          return NextResponse.json(
            { error: 'Invalid API key. Please check your Brevo API configuration.' },
            { status: 500 }
          )
        } else if (brevoResponse.status === 403) {
          return NextResponse.json(
            { error: 'Access denied. Please check your API key permissions.' },
            { status: 500 }
          )
        } else if (brevoResponse.status === 400 && responseData.message?.includes('Contact already exist')) {
          // Contact already exists - still a success from user perspective
          return NextResponse.json(
            { message: 'You are already subscribed to our newsletter' },
            { status: 200 }
          )
        } else {
          // Other errors from Brevo
          console.error('Brevo API error:', {
            status: brevoResponse.status,
            statusText: brevoResponse.statusText,
            response: responseData
          })
          return NextResponse.json(
            { error: 'Failed to subscribe. Please try again later.' },
            { status: 500 }
          )
        }
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError)
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again later.' },
          { status: 500 }
        )
      }
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: Add GET method for health check
export async function GET() {
  return NextResponse.json(
    { message: 'Newsletter API is running' },
    { status: 200 }
  )
} 