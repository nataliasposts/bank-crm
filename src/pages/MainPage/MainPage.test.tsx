import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';
import userEvent from '@testing-library/user-event';
import userApiService from 'src/api/userApiService';

jest.mock('src/api/userApiService.ts');

test('searching', async () => {
  const users = [
    { id: 1, name: 'User One', key: 'key1' },
    { id: 2, name: 'User Two', key: 'key2' }
  ];

  (userApiService.fetchUsers as jest.Mock).mockResolvedValueOnce(users);

  render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );

  for (const user of users) {
    await waitFor(() => expect(screen.getByText(user.name)).toBeInTheDocument());
  }

  userEvent.type(screen.getByPlaceholderText('Search'), 'Two');

  await waitFor(() => expect(screen.getByText('User Two')).toBeInTheDocument());
  expect(screen.queryByText('User One')).not.toBeInTheDocument();
});
