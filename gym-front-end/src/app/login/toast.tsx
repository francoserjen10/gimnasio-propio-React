import { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // se oculta luego de 3 seg
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`
        fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white z-50
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
      `}
        >
            {message}
        </div>
    );
}
