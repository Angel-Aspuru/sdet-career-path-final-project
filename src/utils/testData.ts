import { CreateAccountPayload } from '../api/types';

export function buildTestAccountPayload(tag: string): CreateAccountPayload {
  const uniqueSuffix = `${tag}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  return {
    name: `QA Tester ${tag}`,
    email: `sdet.qa.${uniqueSuffix}@example.com`,
    password: 'Sup3rSecret!1',
    title: 'Mr',
    birth_date: '1',
    birth_month: '1',
    birth_year: '1990',
    firstname: 'QA',
    lastname: 'Tester',
    company: 'Unosquare',
    address1: '123 Test Street',
    address2: '',
    country: 'United States',
    zipcode: '12345',
    state: 'CA',
    city: 'Testville',
    mobile_number: '1234567890',
  };
}
