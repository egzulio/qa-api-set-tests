/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { expect, test } from '@fixtures/api.fixture';
import { VALID_ID } from '@helpers/validators';

test.describe('POST /instructors', () => {
  test('should create a new instructor successfully', async ({ request }) => {
    const newInstructor = {
      name: 'Jan Jan',
      email: 'jan@jan.pl',
      specialization: 'QA Testing',
      bio: 'Experienced tester',
    };

    const response = await request.post('/instructors', {
      data: newInstructor,
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.id).toMatch(VALID_ID);
    expect(responseBody).toHaveProperty('name', newInstructor.name);
    expect(responseBody).toHaveProperty('email', newInstructor.email);
    expect(responseBody).toHaveProperty('specialization', newInstructor.specialization);
    expect(responseBody).toHaveProperty('bio', newInstructor.bio);
  });
  test.skip('should return 400 when required fields are empty', async ({ request }) => {
    const response = await request.post('/instructors');
    expect(response.status()).toBe(400);
  });
});
