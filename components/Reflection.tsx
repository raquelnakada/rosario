import React, { useState, useEffect } from 'react';
import { generateDailyContent } from '../services/geminiService';
import { DailyContent } from '../types';

interface ReflectionProps {
  day: number;
  title: string;
  theme: string;
  staticContent?: DailyContent;
}

const Reflection: React.FC<ReflectionProps> = ({ day, title, theme, staticContent }) => {
  const [content, setContent] = useState<DailyContent | null>(staticContent || null);
  const [loading, setLoading] = useState<boolean>(!staticContent);

  useEffect(() => {
    if (staticContent) {
      setContent(staticContent);
      setLoading(false);
      return;
    }

    const fetchContent = async () => {
      setLoading(true);
      const result = await generateDailyContent(day, title, theme);
      setContent(result);
      setLoading(false);
    };

    fetchContent();
  }, [day, title, theme, staticContent]);

  if (loading) {
    return (
      <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-indigo-100 animate-pulse space-y-4">
        <div className="h-4 bg-indigo-100 rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-2 bg-slate-100 rounded"></div>
          <div className="h-2 bg-slate-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="mt-8 space-y-6">
      <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
        <h3 className="text-indigo-900 font-bold mb-3">Reflexão</h3>
        <p className="text-slate-700 font-serif leading-relaxed text-lg italic">"{content.reflection}"</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-slate-800 font-bold mb-2">Oração</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{content.prayer}</p>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 shadow-sm">
          <h3 className="text-orange-900 font-bold mb-2">Ação Concreta</h3>
          <p className="text-orange-900/80 text-sm leading-relaxed font-medium">{content.action}</p>
        </div>
      </div>
    </div>
  );
};

export default Reflection;