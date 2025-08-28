import { APIResponse, expect, request } from '@playwright/test';

export async function deleteCreatedCourse(id: string): Promise<APIResponse> {
  const api = await request.newContext();
  const response = await api.delete(`/courses/${id}`);
  expect(response.status()).toBe(200);
  return response;
}
