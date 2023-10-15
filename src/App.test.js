import { render, screen, waitFor } from '@testing-library/react';
import {server} from './mocks/server'
import { rest } from "msw";
import App from './App';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


///testing fetching and diplaying of joke - fetchJoke function output///
test('fetches and displays a joke', async () => {
  render(<App />);
  
  const jokeElement = await waitFor(() => screen.getByText(/A random joke/i));
  
  expect(jokeElement).toBeInTheDocument();
});
///testing fetching and diplaying of categories - fetchJCategories function output///
test('fetches and displays categories list', async () => {
  render(<App />);

  const political = await screen.findByText(/political/i);
  const sport = await screen.findByText(/sport/i);
  const food = await screen.findByText(/food/i);

  expect(political).toBeInTheDocument();
  expect(sport).toBeInTheDocument();
  expect(food).toBeInTheDocument();

});
///testing display of static components///
test('displays site header', async () => {
  render(<App />);

  const siteTitle = await screen.findByText(/Roundhouse Kick/i);


  expect(siteTitle).toBeInTheDocument();

});

test('displays site footer', async () => {
  render(<App />);

  const siteCredits = await screen.findByText(/chucknorris.io/i);


  expect(siteCredits).toBeInTheDocument();

});
///testing display of errors - with overwriting handler to cause error///
test('handles error from API and displays errorMessage for fetching joke', async () => {
server.use(    
  rest.get('https://api.chucknorris.io/jokes/random', (req, res, ctx) => {
  return res(
    ctx.status(404),
    ctx.text('Joke with not found.')
  );
})
)

  render(<App />);

  const errorMessage = await waitFor(() => screen.getByText(/You failed to/i));


  expect(errorMessage).toBeInTheDocument();

});

test('handles error from API and displays errorMessage for fetching categories', async () => {
  server.use(    
    rest.get('https://api.chucknorris.io/jokes/categories', (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.text('Joke with not found.')
    );
  })
  )
  
    render(<App />);
  
    const errorMessage = await waitFor(() => screen.getByText(/You failed to/i));
  
  
    expect(errorMessage).toBeInTheDocument();
  
  });