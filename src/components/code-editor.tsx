import './code-editor.css';
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
    initialValue?: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getValue, editor) => {
        editorRef.current = editor;

        editor.onDidChangeModelContent(() => {
            onChange(getValue());
        });

        editor.getModel()?.updateOptions({ tabSize: 2 });

        // jsx and tsx highlighting
        const highlighter = new Highlighter(
            // @ts-ignore
            window.SVGComponentTransferFunctionElement,
            codeShift,
            editor
        );

        highlighter.highLightOnDidChangeModelContent(
            () => {},
            () => {},
            undefined,
            () => {}
        );
    };

    const onFormatClick = () => {
        const unformmatted = editorRef.current.getModel().getValue();

        const formatted = prettier.format(unformmatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '');

        editorRef.current.setValue(formatted);
    };

    return (
        <div className="editor-wrapper">
            <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
            <MonacoEditor 
                editorDidMount={ onEditorDidMount }
                value={ initialValue }
                height="500px" 
                language="javascript" 
                theme="dark" 
                options={{ 
                    automaticLayout: true,
                    folding: false,
                    fontSize: 16,
                    lineNumbersMinChars: 3,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    showUnused: false,
                    wordWrap: 'on' 
                }} 
            />
        </div>
    );
}

export default CodeEditor;
