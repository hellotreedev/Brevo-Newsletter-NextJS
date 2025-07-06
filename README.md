# 📧 Brevo Newsletter Signup

A production-ready, modern newsletter signup form built with **Next.js 14** that seamlessly integrates with **Brevo** (formerly Sendinblue) to collect and manage email subscriptions.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Brevo API](https://img.shields.io/badge/Brevo-API%20v3-green)](https://developers.brevo.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- ✨ **Clean, responsive UI** - Modern design that works on all devices
- 🔒 **Secure API integration** - Direct connection to Brevo's REST API v3
- 🎯 **Real-time validation** - Client-side and server-side email validation
- 📱 **Mobile-optimized** - Touch-friendly design with proper accessibility
- 🚀 **Next.js 14 App Router** - Latest Next.js features with TypeScript
- 💫 **Enhanced UX** - Loading states, success/error feedback, and animations
- 🛡️ **Production-ready** - Comprehensive error handling and security measures
- 🔄 **Smart duplicate handling** - Graceful handling of existing subscribers
- 🎨 **Easily customizable** - Clean code structure for easy modifications
- 📊 **Contact management** - Automatic contact creation and list management

## 🎯 Perfect For

- **SaaS applications** needing newsletter signups
- **Marketing websites** with lead capture forms
- **Blog platforms** for subscriber management
- **E-commerce sites** for customer communications
- **Developers** learning Next.js and API integration
- **Agencies** building client newsletter solutions

## 🏗️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Brevo API v3](https://developers.brevo.com/)** - Email marketing platform
- **Modern CSS** - Responsive design with CSS custom properties
- **Fetch API** - Native HTTP client for API calls

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/brevo-newsletter-next.git
cd brevo-newsletter-next
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp env.example .env.local
```

Edit `.env.local` with your Brevo credentials:

```env
BREVO_API_KEY=your_brevo_api_key_here
BREVO_LIST_ID=your_list_id_here
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your newsletter signup form! 🎉

## 📋 Getting Your Brevo Credentials

### 🔑 API Key

1. **Login** to your [Brevo dashboard](https://app.brevo.com)
2. **Navigate** to **Settings** → **API Keys**
3. **Create** a new API key or copy an existing one
4. **Ensure** it has **Contacts** permissions
5. **Copy** the key to your `.env.local` file

### 📝 List ID

1. **Go to** **Contacts** → **Lists** in your Brevo dashboard
2. **Select** the list you want to use for newsletter subscriptions
3. **Copy** the List ID from the URL: `https://app.brevo.com/lists/[LIST_ID]`
4. **Paste** it in your `.env.local` file

> 💡 **Tip**: Create a dedicated list for your newsletter subscribers to keep them organized!

## 🏗️ Project Structure

```
brevo-newsletter-next/
├── 📁 app/
│   ├── 📁 api/
│   │   └── 📁 newsletter/
│   │       └── 📄 route.ts          # Brevo API integration endpoint
│   ├── 📄 globals.css               # Global styles and CSS variables
│   ├── 📄 layout.tsx                # Root layout with metadata
│   └── 📄 page.tsx                  # Main newsletter signup form
├── 📄 env.example                   # Environment variables template
├── 📄 next.config.js                # Next.js configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 .gitignore                    # Git ignore rules
└── 📄 README.md                     # This documentation
```

## 🔧 How It Works

### Frontend Architecture (`app/page.tsx`)

```typescript
// Key features implemented:
- React Hook-based state management
- TypeScript interfaces for type safety
- Real-time email validation with regex
- Loading states with spinner animations
- Success/error message handling
- Responsive CSS with mobile-first design
- Accessible form elements and ARIA labels
```

### Backend API (`app/api/newsletter/route.ts`)

```typescript
// Core functionality:
- Next.js 14 App Router API routes
- Server-side email validation
- Secure Brevo API integration
- Comprehensive error handling
- HTTP status code management (201, 204, 400, 401, 403)
- Environment variable validation
- Detailed logging for debugging
```

### Brevo Integration Details

The application leverages **Brevo's REST API v3** with the following endpoints:

- **`POST /v3/contacts`** - Creates or updates contacts
- **Response handling** for all status codes:
  - `201 Created` - New contact successfully created
  - `204 No Content` - Contact already exists/updated
  - `400 Bad Request` - Invalid data or duplicate contact
  - `401 Unauthorized` - Invalid API key
  - `403 Forbidden` - Insufficient permissions

## 🎨 Customization Guide

### 🎭 Styling

The application uses **vanilla CSS** with CSS custom properties for easy theming:

```css
/* Key CSS variables in globals.css */
:root {
  --primary-color: #007bff;
  --success-color: #28a745;
  --error-color: #dc3545;
  --border-radius: 6px;
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
}
```

### 📝 Adding Form Fields

To extend the form with additional fields (name, company, etc.):

1. **Update TypeScript interfaces:**
```typescript
interface FormState {
  email: string;
  name: string;        // Add new field
  company?: string;    // Optional field
  // ... other fields
}
```

2. **Add form inputs:**
```jsx
<input
  type="text"
  placeholder="Your name"
  value={formState.name}
  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
/>
```

3. **Update API route:**
```typescript
const contactData = {
  email: email.toLowerCase().trim(),
  firstName: name,           // Map to Brevo fields
  listIds: [parseInt(listId)],
  attributes: {
    COMPANY: company         // Custom attributes
  }
};
```

### 🔧 Advanced Brevo Features

Explore additional Brevo API capabilities:

```typescript
// Example: Adding custom attributes
const contactData = {
  email: email,
  listIds: [parseInt(listId)],
  attributes: {
    FNAME: firstName,
    LNAME: lastName,
    COMPANY: company,
    SIGNUP_DATE: new Date().toISOString(),
    SOURCE: 'website_newsletter'
  }
};
```

## 🌐 API Reference

### Newsletter Subscription Endpoint

#### `POST /api/newsletter`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Successfully subscribed to newsletter",
  "contactId": 2372
}
```

**Error Responses:**
```json
// Invalid email
{
  "error": "Invalid email format"
}

// Configuration error
{
  "error": "Newsletter service is not configured. Please contact the administrator."
}

// Brevo API error
{
  "error": "Failed to subscribe. Please try again later."
}
```

#### `GET /api/newsletter`

Health check endpoint:

**Response (200):**
```json
{
  "message": "Newsletter API is running"
}
```

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `BREVO_API_KEY` | Your Brevo API key | ✅ Yes | `xkeysib-abc123...` |
| `BREVO_LIST_ID` | Target contact list ID | ✅ Yes | `12` |

### Testing the Integration

```bash
# Test API health
curl http://localhost:3000/api/newsletter

# Test subscription
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to [Vercel](https://vercel.com)
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Set Environment Variables:**
   - Go to your project settings in Vercel
   - Add `BREVO_API_KEY` and `BREVO_LIST_ID`
   - Redeploy if necessary

### Other Platforms

**Netlify:**
- Configure build settings: `npm run build`
- Publish directory: `.next`
- Add environment variables in Netlify dashboard

**Railway/Render:**
- Add environment variables in platform settings
- Configure build and start commands

## 🔒 Security Best Practices

- ✅ **API keys** stored securely in environment variables
- ✅ **Server-side validation** for all user inputs
- ✅ **No sensitive data** exposed to client-side
- ✅ **CORS protection** with Next.js built-in security
- ✅ **Rate limiting** can be added with middleware
- ✅ **Input sanitization** for email addresses

## 🐛 Troubleshooting

### Common Issues

**🔴 "Newsletter service is not configured"**
- Verify `BREVO_API_KEY` and `BREVO_LIST_ID` are set
- Check for typos in environment variable names
- Ensure `.env.local` file is in project root

**🔴 "Invalid API key"**
- Confirm API key is correct in Brevo dashboard
- Verify API key has **Contacts** permissions
- Check if API key is active and not expired

**🔴 "Failed to subscribe"**
- Verify list ID exists in your Brevo account
- Check list permissions and status
- Review server logs for detailed error messages

**🔴 Build/TypeScript errors**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version compatibility (Node 18+)
- Verify TypeScript configuration

### Debug Mode

Enable detailed logging by adding console.log statements:

```typescript
// In app/api/newsletter/route.ts
console.log('API Key:', apiKey?.substring(0, 10) + '...');
console.log('List ID:', listId);
console.log('Request data:', { email });
```

## 📚 Learning Resources

### Brevo API Documentation
- **[API Overview](https://developers.brevo.com/docs)** - Complete API documentation
- **[Contacts API](https://developers.brevo.com/reference/createcontact)** - Contact management endpoints
- **[Lists API](https://developers.brevo.com/reference/getlists)** - List management
- **[Authentication](https://developers.brevo.com/docs/getting-started)** - API key setup

### Next.js Resources
- **[Next.js Documentation](https://nextjs.org/docs)** - Framework documentation
- **[App Router](https://nextjs.org/docs/app)** - New routing system
- **[API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Server-side endpoints

### TypeScript
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Language reference
- **[React TypeScript](https://react-typescript-cheatsheet.netlify.app/)** - React with TypeScript

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 1. Fork & Clone
```bash
git clone https://github.com/your-username/brevo-newsletter-next.git
cd brevo-newsletter-next
```

### 2. Create Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Make Changes
- Follow existing code style and patterns
- Add TypeScript types for new features
- Update documentation as needed
- Test thoroughly

### 4. Submit Pull Request
- Write a clear description of changes
- Include screenshots for UI changes
- Reference any related issues

## 📊 Roadmap

### Version History
- **v1.0.0** - Initial release with core functionality

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Brevo Newsletter Next.js

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- **[Brevo](https://www.brevo.com/)** for providing an excellent email marketing platform
- **[Next.js Team](https://nextjs.org/)** for the amazing React framework
- **[Vercel](https://vercel.com/)** for seamless deployment experience
- **Open source community** for inspiration and best practices

## 📞 Support

### Get Help

- **🐛 Issues**: [GitHub Issues](https://github.com/your-username/brevo-newsletter-next/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/your-username/brevo-newsletter-next/discussions)
- **📧 Email**: [your-email@example.com](mailto:your-email@example.com)

### Commercial Support

Need custom implementation or enterprise features? Contact us for professional services:

- Custom form designs and integrations
- Advanced Brevo automation setup
- Performance optimization
- Security auditing
- Training and consulting

---

<div align="center">

**⭐ Star this repo if it helped you build better newsletter signups!**

[🚀 Live Demo](https://brevo-newsletter-next-js.vercel.app/) • [📚 Documentation](https://github.com/hellotreedev/Brevo-Newsletter-NextJS) • [🐛 Report Bug](https://github.com/hellotreedev/Brevo-Newsletter-NextJS/issues) • [💡 Request Feature](https://github.com/hellotreedev/Brevo-Newsletter-NextJS/issues)

Made with ❤️ by developers, for developers.

</div> 