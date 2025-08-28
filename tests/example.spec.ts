import { expect, test } from '@fixtures/api.fixture';

test('should return status code 200 ok', async ({ request, log }) => {
  const response = await request.get('/');
  expect(response.status()).toBe(200);
  log.info(response.status());
});
