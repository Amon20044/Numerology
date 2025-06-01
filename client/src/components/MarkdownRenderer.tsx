import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const parseMarkdown = (text: string) => {
    // Enhanced markdown parsing with better styling
    let html = text;

    // Headers with custom styling
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-purple-800 mt-6 mb-3 border-b-2 border-purple-200 pb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-purple-900 mt-8 mb-4 border-b-3 border-purple-300 pb-3">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-purple-900 mt-8 mb-6 border-b-4 border-purple-400 pb-4">$1</h1>');

    // Bold text with emphasis
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 bg-yellow-50 px-1 rounded">$1</strong>');

    // Italic text
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>');

    // Bullet points with custom styling
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4 mb-2 text-gray-700 flex items-start"><span class="text-purple-500 mr-2 mt-1">•</span><span>$1</span></li>');
    
    // Numbered lists
    html = html.replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 mb-2 text-gray-700 flex items-start"><span class="text-purple-600 font-semibold mr-3 mt-1">$1.</span><span>$2</span></li>');

    // Wrap consecutive list items
    html = html.replace(/(<li.*?<\/li>\s*)+/g, '<ul class="space-y-1 mb-4">$&</ul>');

    // Line breaks and paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">');
    html = html.replace(/\n/g, '<br/>');

    // Wrap in paragraph if not already wrapped
    if (!html.startsWith('<')) {
      html = '<p class="mb-4 text-gray-700 leading-relaxed">' + html + '</p>';
    }

    // Code or special formatting
    html = html.replace(/`(.*?)`/g, '<code class="bg-gray-100 text-purple-800 px-2 py-1 rounded font-mono text-sm">$1</code>');

    // Quote blocks
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-purple-300 pl-4 py-2 my-4 bg-purple-50 italic text-gray-600">$1</blockquote>');

    return html;
  };

  const renderSections = (content: string) => {
    const sections = content.split(/(?=\*\*[A-Z][A-Z\s&]+\*\*)/);
    
    return sections.map((section, index) => {
      if (section.trim() === '') return null;
      
      const html = parseMarkdown(section);
      
      return (
        <div key={index} className="mb-8">
          <div 
            dangerouslySetInnerHTML={{ __html: html }}
            className="prose prose-lg max-w-none"
          />
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      {renderSections(content)}
    </div>
  );
};

export default MarkdownRenderer;