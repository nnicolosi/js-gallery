const cells = [
    {
        "content": "# JS Gallery\n\nThis is an interactive coding environment.  You can write JavaScript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell (including this one) to edit it\n- The code in each code editor is all joined together into one file.  If you define a variable in a cell, you can refer to it in any subsequent cell.\n- You can show any React component, string, number, or anything else by calling the show() function.  This is a function built into this environment.  Call the show() function multiple times to show multiple values.\n- Re-order or delete cells using the buttons on the top right.\n- Add new cells by hovering on the divider between each pair of cells, or immediately after the last cell.",
        "type": "text",
        "id": "89a6q"
    },
    {
        "content": "import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>Click</button>\n      <h3>Count: {count}</h3>\n    </div>\n  );\n};\n\nshow(<Counter />);",
        "type": "code",
        "id": "elaco"
    }
];

export default cells;