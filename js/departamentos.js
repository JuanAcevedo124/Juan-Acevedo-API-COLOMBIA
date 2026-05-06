const API_URL = 'https://api-colombia.com/api/v1';
const ENDPOINT = '/Department';

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const containerEl = document.getElementById('departamentos-container');
const totalEl = document.getElementById('total-departamentos');
const regionesListaEl = document.getElementById('regiones-lista');

async function cargarDepartamentos() {
    try {
        mostrarLoading(true);
        ocultarError();
        
        const response = await fetch(`${API_URL}${ENDPOINT}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const departamentos = await response.json();
        
        if (!departamentos || departamentos.length === 0) {
            throw new Error('No se encontraron departamentos');
        }
        
        renderizarDepartamentos(departamentos);
        
        contarPorRegion(departamentos);
        
        totalEl.textContent = departamentos.length;
        
    } catch (error) {
        console.error('Error cargando departamentos:', error);
        mostrarError(`❌ Error: ${error.message}. Intenta recargar la página.`);
    } finally {
        mostrarLoading(false);
    }
}

function renderizarDepartamentos(departamentos) {
    containerEl.innerHTML = '';
    
    const departamentosAMostrar = departamentos.slice(0, 33);
    
    departamentosAMostrar.forEach(depto => {
        const card = document.createElement('article');
        card.className = 'card';
        
        const poblacion = depto.population?.toLocaleString('es-CO') || 'N/A';
        const superficie = depto.surface?.toLocaleString('es-CO') || 'N/A';
        
        card.innerHTML = `
            <h3>${depto.name}</h3>
            <p><span class="destacado">Región:</span> ${obtenerNombreRegion(depto.regionId)}</p>
            <p><span class="destacado">Población:</span> ${poblacion} hab.</p>
            <p><span class="destacado">Superficie:</span> ${superficie} km²</p>
            <p><strong>Capital:</strong> ${depto.cityCapital?.name || 'N/A'}</p>
            <p>${truncateText(depto.description, 120)}</p>
        `;
        
        containerEl.appendChild(card);
    });
}

function contarPorRegion(departamentos) {
    const contador = {};
    
    departamentos.forEach(depto => {
        const regionId = depto.regionId || 'Sin región';
        const nombreRegion = obtenerNombreRegion(regionId);
        contador[nombreRegion] = (contador[nombreRegion] || 0) + 1;
    });
    
    regionesListaEl.innerHTML = '';
    Object.entries(contador).forEach(([region, cantidad]) => {
        const badge = document.createElement('span');
        badge.textContent = `${region}: ${cantidad}`;
        regionesListaEl.appendChild(badge);
    });
}

function obtenerNombreRegion(regionId) {
    const regiones = {
        1: 'Caribe',
        2: 'Pacífica',
        3: 'Orinoquía',
        4: 'Amazonía',
        5: 'Andina',
        6: 'Insular'
    };
    return regiones[regionId] || 'Otra';
}

function truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength 
        ? text.substring(0, maxLength) + '...' 
        : text;
}

function mostrarLoading(mostrar) {
    loadingEl.classList.toggle('hidden', !mostrar);
}

function mostrarError(mensaje) {
    errorEl.textContent = mensaje;
    errorEl.classList.remove('hidden');
}

function ocultarError() {
    errorEl.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', cargarDepartamentos);