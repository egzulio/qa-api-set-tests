/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, test } from '@fixtures/api.fixture';
import { NOT_EMPTY_STRING } from '@helpers/validators';

test.describe('POST /courses', () => {
  test('should create new course', async ({ request }) => {
    const newCourse = {
      title: 'JavaScript for Beginners',
      instructorId: 'abc123',
      duration: '8 weeks',
      category: 'Web Development',
      description: 'An introductory course on JavaScript programming.',
    };
    const response = await request.post('/courses', {
      data: newCourse,
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    //title assertion
    expect(responseBody).toHaveProperty('title', newCourse.title);
    expect(responseBody.title).toMatch(NOT_EMPTY_STRING);

    //instructorId assertion
    expect(responseBody).toHaveProperty('instructorId', newCourse.instructorId);
    expect(responseBody.instructorId).toMatch(NOT_EMPTY_STRING);

    //duration assertion
    expect(responseBody.duration).toBe(newCourse.duration);

    expect(responseBody).toHaveProperty('duration', newCourse.duration);
    expect(responseBody.duration).toMatch(NOT_EMPTY_STRING);

    //category assertion
    expect(responseBody).toHaveProperty('category', newCourse.category);
    expect(responseBody.category).toMatch(NOT_EMPTY_STRING);

    //description assertion
    expect(responseBody).toHaveProperty('description', newCourse.description);
    expect(responseBody.description).toMatch(NOT_EMPTY_STRING);
  });
});
