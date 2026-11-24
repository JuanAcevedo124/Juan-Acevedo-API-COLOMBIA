# Mini portal de Colombia

Sitio web que consulta la API pública [api-colombia.com](https://api-colombia.com) y presenta información sobre departamentos, platos típicos y presidentes de Colombia.

**Demo:** https://juanacevedo124.github.io/Juan-Acevedo-API-COLOMBIA/

## Secciones

- **Departamentos:** nombre, región, capital, población, superficie y descripción, con conteo por región.
- **Platos típicos:** galería con imagen, departamento y descripción.
- **Presidentes:** listado ordenado por periodo de mandato.

## Tecnologías

- HTML5 y CSS3 (variables, Flexbox y Grid)
- JavaScript ES6+: `fetch`, `async/await` y manipulación del DOM
- Estados de carga y manejo de errores con `try/catch`

## Endpoints utilizados

| Sección | Método | Endpoint |
|---|---|---|
| Departamentos | GET | `https://api-colombia.com/api/v1/Department` |
| Platos típicos | GET | `https://api-colombia.com/api/v1/TypicalDish` |
| Presidentes | GET | `https://api-colombia.com/api/v1/President` |

## Estructura

```text
Juan-Acevedo-API-COLOMBIA/
├── index.html
├── departamentos.html
├── platosTipicos.html
├── presidentes.html
├── css/styles.css
└── js/
    ├── departamentos.js
    ├── platosTipicos.js
    └── presidentes.js
```

## Ejecución local

```bash
git clone https://github.com/JuanAcevedo124/Juan-Acevedo-API-COLOMBIA.git
cd Juan-Acevedo-API-COLOMBIA
npx serve .
```

Se requiere conexión a internet para consultar la API.

## Autor

Juan José Acevedo Morales, desarrollador de software junior.
[Portafolio](https://juanacevedo124.github.io/Portafolio/) | [GitHub](https://github.com/JuanAcevedo124) | [LinkedIn](https://www.linkedin.com/in/juan-acevedo-b24759450/)
