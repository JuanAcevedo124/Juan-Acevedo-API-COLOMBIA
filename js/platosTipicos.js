
const API_URL = 'https://api-colombia.com/api/v1';
const ENDPOINT = '/TypicalDish';

const IMAGENES_CORREGIDAS = {
    'tamal tolimense': 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=640&h=400&fit=crop',
    'arroz de lisa': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=640&h=400&fit=crop',
    'dulce de guayaba': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=640&h=400&fit=crop'
};
const IMAGEN_DEFAULT = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=640&h=400&fit=crop';

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const containerEl = document.getElementById('platos-container');
const totalPlatosEl = document.getElementById('total-platos');

async function cargarPlatosTipicos() {
    try {
        mostrarLoading(true);
        ocultarError();
        
        const response = await fetch(`${API_URL}${ENDPOINT}`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const platos = await response.json();
        if (!platos || platos.length === 0) throw new Error('No se encontraron platos típicos');
        
        renderizarPlatos(platos);
        totalPlatosEl.textContent = `${platos.length} platos típicos`;
        
    } catch (error) {
        console.error('Error cargando platos:', error);
        mostrarError(`❌ Error: ${error.message}`);
    } finally {
        mostrarLoading(false);
    }
}


function renderizarPlatos(platos) {
    containerEl.innerHTML = '';
    
    const platosAMostrar = platos.slice(0, Math.max(15, platos.length));
    
    platosAMostrar.forEach(plato => {
        const card = document.createElement('article');
        card.className = 'card';
        
        const nombrePlato = plato.name.toLowerCase().trim();
        let imagenUrl;
        
        if (IMAGENES_CORREGIDAS[nombrePlato]) {
            imagenUrl = IMAGENES_CORREGIDAS[nombrePlato];
        }
        else if (plato.imageUrl && plato.imageUrl.trim() !== '') {
            imagenUrl = plato.imageUrl;
        }
        else {
            imagenUrl = IMAGEN_DEFAULT;
        }
        
        card.innerHTML = `
            <img src="${imagenUrl}" 
                alt="${plato.name}"
                onerror="this.onerror=null; this.src='${IMAGEN_DEFAULT}'">
            <h3>${plato.name}</h3>
            <p><strong>Departamento:</strong> ${plato.department?.name || 'N/A'}</p>
            <p>${plato.description ? plato.description.substring(0, 150) + '...' : ''}</p>
        `;
        
        containerEl.appendChild(card);
    });
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

document.addEventListener('DOMContentLoaded', cargarPlatosTipicos);