// test-groq.js
// Test the Groq API integration

async function testGroqEndpoint() {
  const VERCEL_URL = 'https://reacture-proxy.vercel.app';
  const endpoint = `${VERCEL_URL}/api/check`;

  console.log('🧪 Testing Groq API integration\n');
  console.log(`Endpoint: ${endpoint}\n`);

  // Test 1: Code review request
  console.log('Test 1: Code review request with Groq');
  try {
    const response1 = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: `export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>Welcome to React</p>
    </div>
  );
}`,
        lessonId: 'lesson-1',
        expectedOutput: 'Hello World',
      }),
    });

    const data1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Response:', JSON.stringify(data1, null, 2));
    console.log('✓ Test 1 completed\n');
  } catch (err) {
    console.error('❌ Test 1 failed:', err.message, '\n');
  }

  // Test 2: Generic system/user request
  console.log('Test 2: Generic system/user request with Groq');
  try {
    const response2 = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system: 'You are a helpful React tutor.',
        user: 'Explain what JSX is in one sentence.',
      }),
    });

    const data2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', JSON.stringify(data2, null, 2));
    console.log('✓ Test 2 completed\n');
  } catch (err) {
    console.error('❌ Test 2 failed:', err.message, '\n');
  }

  console.log('✅ Groq API tests completed!');
}

testGroqEndpoint().catch(err => {
  console.error('❌ Test error:', err);
  process.exit(1);
});
