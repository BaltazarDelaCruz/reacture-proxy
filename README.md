# Reacture Proxy Server

This is a Vercel serverless function that acts as a proxy for the Anthropic Claude API, allowing the Reacture Flutter app to check student code using AI.

## Setup Instructions

### 1. Deploy to Vercel

```bash
cd reacture-proxy
vercel deploy
```

### 2. Set Environment Variables

After deployment, go to your Vercel project dashboard and add the following environment variable:

**Variable Name:** `ANTHROPIC_API_KEY`
**Value:** Your Anthropic API key (get it from https://console.anthropic.com)

### 3. Redeploy

After setting the environment variable, redeploy:

```bash
vercel deploy --prod
```

## How It Works

1. The Flutter app sends a POST request to `https://reacture-proxy.vercel.app/api/check`
2. The request includes:
   - `system`: The system prompt for Claude
   - `user`: The user prompt with the student's code
3. The proxy forwards this to the Anthropic API
4. The response is sent back to the Flutter app

## API Endpoint

**URL:** `https://reacture-proxy.vercel.app/api/check`
**Method:** POST
**Content-Type:** application/json

### Request Body

```json
{
  "system": "You are Reacture AI Code Reviewer...",
  "user": "Lesson Task: ...\nStudent App.jsx:\n..."
}
```

### Response

```json
{
  "text": "PASS: Your code looks great!"
}
```

## Troubleshooting

### "API key not configured on server"
- Make sure you've set the `ANTHROPIC_API_KEY` environment variable in Vercel
- Redeploy after setting the variable

### "Check timed out"
- The AI review took longer than 15 seconds
- Try again, or check your internet connection

### "Network error"
- Check your internet connection
- Verify the Vercel deployment is active

## Local Testing

To test locally, create a `.env.local` file:

```
ANTHROPIC_API_KEY=your_api_key_here
```

Then run with Vercel CLI:

```bash
vercel dev
```

This will start a local server at `http://localhost:3000/api/check`
