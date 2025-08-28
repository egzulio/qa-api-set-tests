/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
import { getRandomInstructorData } from '@datafactory/instructor.data';
import { expect, test } from '@fixtures/api.fixture';
import { createNewInstructorRequest } from '@requests/instructors/create.instructor.request';
import { readNonExistingInstructorByIdRequest } from '@requests/instructors/read.instructor.request';

test.describe('DELETE /instructors/:id', () => {
  test('should create and delete an instructor successfully', async ({ request, log }) => {
    let instructorId: string;

    const newInstructor = getRandomInstructorData();

    await test.step('Create a new instructor', async () => {
      const responseData = await (await createNewInstructorRequest(newInstructor)).json();

      instructorId = responseData.id;
      log.info(responseData);
    });

    await test.step('Delete the instructor', async () => {
      const updateResponse = await request.delete(`/instructors/${instructorId}`);
      expect(updateResponse.status()).toBe(200);
    });

    await test.step('Verify the updated instructor', async () => {
      await readNonExistingInstructorByIdRequest(instructorId);
    });
  });
});
