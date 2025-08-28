/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getRandomInstructorData } from '@datafactory/instructor.data';
import { expect, test } from '@fixtures/api.fixture';
import { createNewInstructorRequest } from '@requests/instructors/create.instructor.request';
import { readInstructorByIdRequest } from '@requests/instructors/read.instructor.request';

test.describe('CRUD operations for /instructors', () => {
  let instructorId: string;

  const newInstructor = getRandomInstructorData();
  const updatedInstructor = getRandomInstructorData();

  test('should perform full CRUD operations', { tag: '@smoke' }, async ({ request }) => {
    await test.step('Create a new instructor', async () => {
      const responseData = await (await createNewInstructorRequest(newInstructor)).json();

      expect(responseData).toMatchObject(newInstructor);
      instructorId = responseData.id;
    });

    await test.step('Get the created instructor', async () => {
      await readInstructorByIdRequest(instructorId);
    });

    await test.step('Update the instructor', async () => {
      const patchResponse = await request.put(`/instructors/${instructorId}`, { data: updatedInstructor });
      expect(patchResponse.status()).toBe(200);

      const responseData = await patchResponse.json();
      expect(responseData).toMatchObject(updatedInstructor);
    });

    await test.step('Delete the instructor', async () => {
      const deleteResponse = await request.delete(`/instructors/${instructorId}`);

      expect(deleteResponse.status()).toBe(200);
    });

    await test.step('Verify instructor is deleted', async () => {
      const getResponse = await request.get(`/instructors/${instructorId}`);

      expect(getResponse.status()).toBe(404);
    });
  });
});
