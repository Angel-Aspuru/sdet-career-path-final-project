import { APIRequestContext } from '@playwright/test';
import {
  ProductsListResponse,
  BrandsListResponse,
  SearchProductResponse,
  MessageResponse,
  CreateAccountPayload,
  UserDetailResponse,
} from './types';

/**
 * Thin, typed wrapper around the automationexercise.com REST API.
 * The API always answers with HTTP 200 and encodes the real result in the
 * JSON body's `responseCode` field, so callers must assert on the body,
 * not on the transport-level status code.
 */
export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async getProductsList(): Promise<ProductsListResponse> {
    const response = await this.request.get('/api/productsList');
    return response.json();
  }

  async getBrandsList(): Promise<BrandsListResponse> {
    const response = await this.request.get('/api/brandsList');
    return response.json();
  }

  async searchProduct(searchTerm?: string): Promise<SearchProductResponse | MessageResponse> {
    const form = searchTerm === undefined ? {} : { search_product: searchTerm };
    const response = await this.request.post('/api/searchProduct', { form });
    return response.json();
  }

  async verifyLogin(email?: string, password?: string): Promise<MessageResponse> {
    const form: Record<string, string> = {};
    if (email !== undefined) form.email = email;
    if (password !== undefined) form.password = password;
    const response = await this.request.post('/api/verifyLogin', { form });
    return response.json();
  }

  async createAccount(payload: CreateAccountPayload): Promise<MessageResponse> {
    const response = await this.request.post('/api/createAccount', { form: payload });
    return response.json();
  }

  async getUserDetailByEmail(email: string): Promise<UserDetailResponse> {
    const response = await this.request.get('/api/getUserDetailByEmail', {
      params: { email },
    });
    return response.json();
  }

  async updateAccount(payload: CreateAccountPayload): Promise<MessageResponse> {
    const response = await this.request.put('/api/updateAccount', { form: payload });
    return response.json();
  }

  async deleteAccount(email: string, password: string): Promise<MessageResponse> {
    const response = await this.request.delete('/api/deleteAccount', {
      form: { email, password },
    });
    return response.json();
  }
}
