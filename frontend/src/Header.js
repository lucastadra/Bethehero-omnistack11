import React from 'react';

export default function Header({ children }) { //Recebe o conteúdo do header como parâmetro
    return (
        <header>
            <h1>{children}</h1>
        </header>
    );
}
