import React, { useState, useEffect } from 'react';

const NotificationRequest: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) return;
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
    } catch (error) {
      console.error("Error", error);
    }
  };

  if (permission === 'granted' || permission === 'denied') return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🔔</span>
        <div>
          <h3 className="font-bold text-blue-900">Ativar Notificações?</h3>
          <p className="text-sm text-blue-700">Receba lembretes para sua oração diária.</p>
        </div>
      </div>
      <button 
        onClick={requestPermission}
        className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
      >
        Ativar
      </button>
    </div>
  );
};

export default NotificationRequest;