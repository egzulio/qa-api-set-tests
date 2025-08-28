/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, test } from '@fixtures/api.fixture';
import { NOT_EMPTY_STRING, VALID_ID } from '@helpers/validators';

test.describe('GET /courses', () => {
  test('should return all courses', async ({ request }) => {
    const response = await request.get('/courses');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.length).toBeGreaterThan(0);
  });
  test('should return one course for specific ID', async ({ request }) => {
    const response = await request.get('/courses/txxg');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    //title assertion
    expect(responseBody).toHaveProperty('title', 'Python Data Analysis');
    expect(responseBody.title).toMatch(NOT_EMPTY_STRING);

    //instructorId assertion
    expect(responseBody).toHaveProperty('instructorId', 'qdk1');
    expect(responseBody.instructorId).toMatch(VALID_ID);

    //duration assertion
    expect(responseBody).toHaveProperty('duration', '10 weeks');
    expect(responseBody.duration).toMatch(NOT_EMPTY_STRING);

    //category assertion
    expect(responseBody).toHaveProperty('category', 'Data Science');
    expect(responseBody.category).toMatch(NOT_EMPTY_STRING);

    //description assertion
    expect(responseBody).toHaveProperty('description', 'Learn data analysis using Python and Pandas.');
    expect(responseBody.description).toMatch(NOT_EMPTY_STRING);
  });
});
