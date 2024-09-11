import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import FileViewPage from './pages/FileViewPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx'
import MainPage from './pages/MainPage.jsx';
import '../style/general.scss'

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<MainPage />} />
                <Route path='/files' element={<FileViewPage />} />
                <Route path='/error' element={<NotFoundPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App
