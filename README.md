# 🇨🇴 Mini Portal de Colombia con API

## 📌 Descripción
Portal web informativo sobre Colombia que consume datos de la API pública **api-colombia.com**.  
El proyecto cumple con los requisitos académicos desarrollando tres secciones independientes conectadas mediante hipervínculos:

### 🗺️ Explorador de Departamentos
Muestra nombre, región, población, superficie y descripción de los 32 departamentos colombianos.  
**Extra implementado:** Conteo de departamentos por región.

### 🍽️ Sabores de Colombia
Galería de platos típicos colombianos con descripción, origen e imagen representativa.  
**Extra implementado:** Filtro por región gastronómica.

### 👔 Presidentes de Colombia
Lista de presidentes con nombre, periodo, partido político y fotografía, ordenados cronológicamente.  
**Extra implementado:** Ordenamiento por año de inicio de mandato.

---

## 🛠️ Tecnologías Usadas
- **HTML5:** Estructura semántica y accesible  
- **CSS3:** Diseño responsive con variables CSS, Flexbox y CSS Grid  
- **JavaScript (ES6+):** Consumo de API con `fetch()`, manipulación dinámica del DOM, manejo de errores con `try/catch` y estados de carga  
- **API REST:** api-colombia.com (pública, sin autenticación)

---

## 🚀 Instrucciones de Uso

1. Descarga o clona el repositorio:
   git clone <URL_DEL_REPOSITORIO>

2. Entra a la carpeta del proyecto:
   cd nombre-del-proyecto

3. Abre `index.html`:

   - Opción A: Doble clic  
   - Opción B: Live Server en VS Code  
   - Opción C: Servidor local:
     npx serve

4. Navega por las secciones:
   - 🗺️ departamentos.html  
   - 🍽️ platosTipicos.html  
   - 👔 presidentes.html  

⚠️ Nota: Usa servidor local (no file://) por CORS.

---

## 📁 Estructura del Proyecto
/Actividad API Colombia  
│── index.html  
│── departamentos.html  
│── platosTipicos.html  
│── presidentes.html  
│── /css/styles.css  
│── /js/departamentos.js, platosTipicos.js, presidentes.js
│── README.md
## 🔗 Endpoints de la API

| Sección        | Endpoint                                           | Método | Descripción                     |
|----------------|--------------------------------------------------|--------|---------------------------------|
| Departamentos  | https://api-colombia.com/api/v1/Department       | GET    | Lista de departamentos         |
| Platos Típicos | https://api-colombia.com/api/v1/TypicalDish      | GET    | Platos gastronómicos           |
| Presidentes    | https://api-colombia.com/api/v1/President        | GET    | Presidentes históricos         |

## 👤 Autor
Juan Acevedo  
github: JuanAcevedo124
correo: juanacevedo1240@gmail.com

---

## 📄 Licencia
Uso educativo. API: api-colombia.com

---