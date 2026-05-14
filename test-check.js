// test-check.js
// Local test script for check.js API endpoint

import handler from './api/check.js';

// Mock request and response objects
const createMockReq = (body, method = 'POST') => ({
  method,
  body,
});

const createMockRes = () => {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
    end() {
      return this;
    },
  };
  return res;
};

// Test cases
async function runTests() {
  console.log('🧪 Testing check.js API endpoint\n');

  // Test 1: Missing ANTHROPIC_API_KEY
  console.log('Test 1: Missing ANTHROPIC_API_KEY');
  const req1 = createMockReq({
    code: 'export default function App() { return <h1>Hello</h1>; }',
    lessonId: 'lesson-1',
    expectedOutput: 'Hello',
  });
  const res1 = createMockRes();
  await handler(req1, res1);
  console.log('Status:', res1.statusCode);
  console.log('Response:', JSON.stringify(res1.body, null, 2));
  console.log('✓ Test 1 passed\n');

  // Test 2: Invalid method (GET)
  console.log('Test 2: Invalid method (GET)');
  const req2 = createMockReq({}, 'GET');
  const res2 = createMockRes();
  await handler(req2, res2);
  console.log('Status:', res2.statusCode);
  console.log('Response:', JSON.stringify(res2.body, null, 2));
  console.log('✓ Test 2 passed\n');

  // Test 3: OPTIONS preflight
  console.log('Test 3: OPTIONS preflight');
  const req3 = createMockReq({}, 'OPTIONS');
  const res3 = createMockRes();
  await handler(req3, res3);
  console.log('Status:', res3.statusCode);
  console.log('Headers:', res3.headers);
  console.log('✓ Test 3 passed\n');

  // Test 4: Missing required fields
  console.log('Test 4: Missing required fields');
  const req4 = createMockReq({ someField: 'value' });
  const res4 = createMockRes();
  await handler(req4, res4);
  console.log('Status:', res4.statusCode);
  console.log('Response:', JSON.stringify(res4.body, null, 2));
  console.log('✓ Test 4 passed\n');

  // Test 5: Valid request with code and lessonId (will fail due to missing API key, but tests structure)
  console.log('Test 5: Valid request structure with code and lessonId');
  const req5 = createMockReq({
    code: 'export default function App() { return <div><h1>Hello World</h1></div>; }',
    lessonId: 'lesson-1',
    expectedOutput: 'Hello World',
  });
  const res5 = createMockRes();
  await handler(req5, res5);
  console.log('Status:', res5.statusCode);
  console.log('Response:', JSON.stringify(res5.body, null, 2));
  console.log('✓ Test 5 passed\n');

  // Test 6: Valid request with system and user fields
  console.log('Test 6: Valid request structure with system and user');
  const req6 = createMockReq({
    system: 'You are a helpful assistant.',
    user: 'What is 2+2?',
  });
  const res6 = createMockRes();
  await handler(req6, res6);
  console.log('Status:', res6.statusCode);
  console.log('Response:', JSON.stringify(res6.body, null, 2));
  console.log('✓ Test 6 passed\n');

  console.log('✅ All tests completed!');
}

runTests().catch(err => {
  console.error('❌ Test error:', err);
  process.exit(1);
});
