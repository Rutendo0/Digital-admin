interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white border-2 border-gray-300 hover:bg-red-50 hover:border-red-300 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group"
          title="Close modal"
        >
          <span className="text-xl text-gray-600 group-hover:text-red-600 font-bold">×</span>
        </button>
        {children}
      </div>
    </div>
  );
}