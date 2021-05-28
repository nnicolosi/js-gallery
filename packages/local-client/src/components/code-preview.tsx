import './code-preview.css';
import { useEffect, useRef } from 'react';

interface CodePreviewProps {
    code: string; 
    error: string;
}

const html = `
    <html>
    <head>
        <style>html { background-color: white; }</style>
    </head>
    <body>
        <div id="root"></div>
        <script>
            const handleError = (err) => {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;"><h1>Runtime Error</h1>' + err + '</div>';
                console.error(err);
            };

            const clearError = () => {
                const root = document.querySelector('#root');
                root.innerHTML = '';
            };

            window.addEventListener('error', (event) => {
                event.preventDefault();
                handleError(event.error);
            });

            window.addEventListener('message', (event) => {
                try {
                    clearError();
                    eval(event.data);
                } catch (err) {
                    handleError(err);
                }
            }, false);
        </script>
    </body>
    </html> 
`;

const CodePreview: React.FC<CodePreviewProps> = ({ code, error }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcDoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50);
    }, [code]);

    return (
        <div className="code-preview-wrapper">
            <iframe 
                ref={iframe} 
                title="preview" 
                sandbox="allow-scripts" 
                srcDoc={html} 
            />
            {error && <div className="preview-error"><h1>Error</h1>{error}</div>}
        </div>
    );
}

export default CodePreview;