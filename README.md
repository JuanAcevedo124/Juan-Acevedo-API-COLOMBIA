# 🇨🇴 Mini Portal de Colombia con API

## Descripción
Portal web informativo sobre Colombia que consume datos de la API pública [api-colombia.com](https://api-colombia.com/). El proyecto cumple con los requisitos académicos desarrollando dos secciones independientes conectadas mediante hipervínculos:
- 🗺️ **Explorador de Departamentos**: Muestra nombre, región, población, superficie y descripción de los departamentos colombianos. *(Extra implementado: Conteo de departamentos por región)*
- 👔 **Presidentes de Colombia**: Lista de presidentes con nombre, periodo, partido político y fotografía, ordenados cronológicamente. *(Extra implementado: Ordenamiento por año de inicio de mandato)*

## Tecnologías Usadas
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsive con variables CSS, Flexbox y CSS Grid
- **JavaScript (ES6+)**: Consumo de API con `fetch()`, manipulación dinámica del DOM, manejo de errores con `try/catch` y estados de carga
- **API REST**: [api-colombia.com](https://api-colombia.com/) (pública, sin autenticación)

## Instrucciones de Uso
1. Descarga o clona el repositorio en tu equipo:
   ```bash
   git clone https://github.com/tu-usuario/tu-nombre-apellido-api-colombia.git