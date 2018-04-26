import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import { create } from 'domain';

const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

export default history