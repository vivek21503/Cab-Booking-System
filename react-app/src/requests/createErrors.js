import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}

export const createError = (message) => {
    return toast.error(message, options);
}
export const createWarning = (message) => {
    return toast.warn(message, options);
}
export const createSuccess = (message) => {
    return toast.success(message, options);
}
export const createInfo = (message) => {
    return toast.info(message, options);
}

export const Toast_Container = () => {
    return(
        <ToastContainer 
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    )
}