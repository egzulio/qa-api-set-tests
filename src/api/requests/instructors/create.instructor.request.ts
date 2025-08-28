import { APIResponse, expect, request } from '@playwright/test';
import { getRandomInstructorData } from '../../datafactory/instructor.data';

export async function createNewInstructorRequest(payload?: object): Promise<APIResponse> {
  if (!payload) {
    payload = getRandomInstructorData();
  }

  const api = await request.newContext();
  const response = await api.post('/instructors', {
    data: payload,
  });
  expect(response.status()).toBe(201);
  return response;
}
