// test-deployed.js
// Test the deployed check.js endpoint on Vercel

async function testDeployedEndpoint() {
  // Your Vercel deployment URL
  const VERCEL_URL = 'https://reacture-proxy.vercel.app';
  const endpoint = `${VERCEL_URL}/api/check`;

  console.log('🧪 Testing deployed check.js endpoint\n');
  console.log(`Endpoint: ${endpoint}\n`);

  // Test 1: Code review request
  console.log('Test 1: Code review request');
  try {
    const response1 = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: 'export default function App() { return <h1>Hello World</h1>; }',
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
  console.log('Test 2: Generic system/user request');
  try {
    const response2 = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system: 'You are a helpful React tutor.',
        user: 'How do I create a functional component in React?',
      }),
    });

    const data2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', JSON.stringify(data2, null, 2));
    console.log('✓ Test 2 completed\n');
  } catch (err) {
    console.error('❌ Test 2 failed:', err.message, '\n');
  }

  // Test 3: Invalid request (missing fields)
  console.log('Test 3: Invalid request (missing fields)');
  try {
    const response3 = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        someField: 'value',
      }),
    });

    const data3 = await response3.json();
    console.log('Status:', response3.status);
    console.log('Response:', JSON.stringify(data3, null, 2));
    console.log('✓ Test 3 completed\n');
  } catch (err) {
    console.error('❌ Test 3 failed:', err.message, '\n');
  }

  // Test 4: OPTIONS preflight
  console.log('Test 4: OPTIONS preflight');
  try {
    const response4 = await fetch(endpoint, {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Status:', response4.status);
    console.log('CORS Headers:');
    console.log('  Access-Control-Allow-Origin:', response4.headers.get('Access-Control-Allow-Origin'));
    console.log('  Access-Control-Allow-Methods:', response4.headers.get('Access-Control-Allow-Methods'));
    console.log('  Access-Control-Allow-Headers:', response4.headers.get('Access-Control-Allow-Headers'));
    console.log('✓ Test 4 completed\n');
  } catch (err) {
    console.error('❌ Test 4 failed:', err.message, '\n');
  }

  console.log('✅ All deployed endpoint tests completed!');
}

testDeployedEndpoint().catch(err => {
  console.error('❌ Test error:', err);
  process.exit(1);
});
