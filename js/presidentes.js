const API_URL = 'https://api-colombia.com/api/v1';
const ENDPOINT = '/President';

const IMAGEN_DEFAULT = 'https://images.unsplash.com/photo-1556157382-97edd2f9e3a7?w=400&h=400&fit=crop';

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const containerEl = document.getElementById('presidentes-container');
const totalPresidentesEl = document.getElementById('total-presidentes');

async function cargarPresidentes() {
    try {
        mostrarLoading(true);
        ocultarError();
        
        const response = await fetch(`${API_URL}${ENDPOINT}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        let presidentes = await response.json();
        
        if (!presidentes || presidentes.length === 0) {
            throw new Error('No se encontraron presidentes');
        }
        
        console.log('=== ESTRUCTURA DE LA API ===');
        console.log('Campos disponibles:', Object.keys(presidentes[0]));
        console.log('Primer presidente completo:', presidentes[0]);
        console.log('===========================');
        
        presidentes = ordenarPorPeriodo(presidentes);
        renderizarPresidentes(presidentes);
        totalPresidentesEl.textContent = `${presidentes.length} presidentes`;
        
    } catch (error) {
        console.error('Error cargando presidentes:', error);
        mostrarError(`❌ Error: ${error.message}`);
    } finally {
        mostrarLoading(false);
    }
}

function ordenarPorPeriodo(presidentes) {
    return presidentes.sort((a, b) => {
        const anioA = obtenerAnioInicio(a);
        const anioB = obtenerAnioInicio(b);
        return anioA - anioB;
    });
}


function obtenerAnioInicio(presidente) {

    for (const key in presidente) {
        const value = presidente[key];
        

        if (typeof value === 'number' && value >= 1800 && value <= 2100) {
            if (key.toLowerCase().includes('start') || key.toLowerCase().includes('begin') || key.toLowerCase().includes('from')) {
                return value;
            }
        }
        

        if (typeof value === 'string') {
            const match = value.match(/(\d{4})/);
            if (match && (key.toLowerCase().includes('period') || key.toLowerCase().includes('year') || key.toLowerCase().includes('time'))) {
                return parseInt(match[1]);
            }
        }
    }
    
    return 0;
}


function obtenerPeriodo(presidente) {
    for (const key in presidente) {
        const value = presidente[key];
        const keyLower = key.toLowerCase();
        
        if (keyLower.includes('period') || keyLower.includes('year') || keyLower.includes('time') || keyLower.includes('date')) {
            if (value && typeof value === 'string' && value.trim() !== '') {
                return value;
            }
        }
    }
    
    let startYear = null;
    let endYear = null;
    
    for (const key in presidente) {
        const keyLower = key.toLowerCase();
        const value = presidente[key];
        
        if (keyLower.includes('start') || keyLower.includes('begin') || keyLower.includes('from')) {
            startYear = value;
        }
        if (keyLower.includes('end') || keyLower.includes('finish') || keyLower.includes('to')) {
            endYear = value;
        }
    }
    
    if (startYear) {
        return `${startYear} - ${endYear || 'Presente'}`;
    }
    
    return 'N/A';
}

function obtenerPartido(presidente) {
    for (const key in presidente) {
        const value = presidente[key];
        const keyLower = key.toLowerCase();
        
        if (keyLower.includes('party') || keyLower.includes('political') || keyLower.includes('partido')) {
            if (value && typeof value === 'string' && value.trim() !== '') {
                return value;
            }
            if (value && typeof value === 'object' && value.name) {
                return value.name;
            }
        }
    }
    
    return 'N/A';
}

function renderizarPresidentes(presidentes) {
    containerEl.innerHTML = '';
    
    const presidentesAMostrar = presidentes.slice(0, Math.max(15, presidentes.length));
    
    presidentesAMostrar.forEach(presidente => {
        const card = document.createElement('article');
        card.className = 'card';
        
        const nombre = presidente.name || presidente.nombre || 'Sin nombre';
        const periodo = obtenerPeriodo(presidente);
        const partido = obtenerPartido(presidente);
        const descripcion = presidente.description || presidente.bio || presidente.biography || '';
        
        const imagenAPI = presidente.image || presidente.imageUrl || presidente.photo || presidente.avatar;
        const imagenUrl = (imagenAPI && imagenAPI.trim() !== '') ? imagenAPI : IMAGEN_DEFAULT;
        
        card.innerHTML = `
            <img src="${imagenUrl}" 
                alt="${nombre}" 
                loading="lazy"
                onerror="this.onerror=null; this.src='${IMAGEN_DEFAULT}'">
            <h3>${nombre}</h3>
            <p><span class="destacado">Periodo:</span> ${periodo}</p>
            <p><span class="destacado">Partido:</span> ${partido}</p>
            ${descripcion ? `<p>${truncateText(descripcion, 120)}</p>` : ''}
        `;
        
        containerEl.appendChild(card);
    });
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

document.addEventListener('DOMContentLoaded', cargarPresidentes);