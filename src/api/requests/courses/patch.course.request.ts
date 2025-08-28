import { APIResponse, expect, request } from '@playwright/test';

export async function updateNewCourse(payload: object, id: string): Promise<APIResponse> {
  const api = await request.newContext();
  const response = await api.patch(`/courses/${id}`, {
    data: payload,
  });
  expect(response.status()).toBe(200);
  return response;
}
