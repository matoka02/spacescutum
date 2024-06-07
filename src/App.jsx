import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { fetchTasks } from './redux/task/taskOperations';

import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import AddTodo from './pages/AddTodo/AddTodo';
import Todos from './pages/Todos/Todos';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='todos' element={<Todos/>}/>
          <Route path='add-todo' element={<AddTodo/>}/>
        </Route>
      </Routes>

      <Toaster 
      position='top-center' 
      reverseOrder={false}
      toastOptions={{
        duration:4000,
        style: {
          background: '#333',
          color: '#fff'
        }
      }}
      />
    </>
  )
}

export default App;
