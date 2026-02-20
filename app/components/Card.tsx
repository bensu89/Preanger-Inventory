import { ReactNode } from 'react';

interface CardProps {
    title: string;
    children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 h-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
            <div className="text-gray-600">
                {children}
            </div>
        </div>
    );
}
