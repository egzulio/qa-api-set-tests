/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
import { expect, test } from '@fixtures/api.fixture';

test.describe('PUT /instructors/:id', () => {
  test('should create and update an instructor successfully', async ({ request, log }) => {
    let instructorId: string;

    const newInstructor = {
      name: 'Jan Jan',
      email: 'asd@asd.pl',
      specialization: 'Python',
      description: 'Experienced Python developer',
    };
    const updatedInstructor = {
      name: 'Name Updated',
      email: 'updated@updated.pl',
      specialization: 'Backend updated',
      description: 'Experienced Backend developer updated',
    };

    await test.step('Create a new instructor', async () => {
      const createResponse = await request.post('/instructors', { data: newInstructor });
      expect(createResponse.status()).toBe(201);
      const responseData = await createResponse.json();
      instructorId = responseData.id;

      expect(responseData).toMatchObject(newInstructor);
    });

    await test.step('Update the instructor details', async () => {
      const updateResponse = await request.put(`/instructors/${instructorId}`, { data: updatedInstructor });
      expect(updateResponse.status()).toBe(200);

      const responseData = await updateResponse.json();

      expect(responseData).toMatchObject(updatedInstructor);
    });

    await test.step('Verify the updated instructor', async () => {
      const getResponse = await request.get(`/instructors/${instructorId}`);
      expect(getResponse.status()).toBe(200);

      const responseData = await getResponse.json();

      expect(responseData).toMatchObject(updatedInstructor);
      log.info(responseData);
    });
  });
});
