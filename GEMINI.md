# Implementación de Animación 3D en Scroll para Isru

## Objetivo
Crear una experiencia de usuario premium interactiva utilizando una animación 3D controlada por el scroll (similar a las páginas de productos de Apple), alineada con la identidad visual elegante y minimalista de Isru Studio.

## Referencias
La implementación se basa en las técnicas demostradas en los videos de Antigravity de webs de lujo y animaciones premium:
- Control de recorrido visual ligado al scroll.
- Pre-renderizado de modelos 3D sin impacto brutal en rendimiento.

## Enfoque Técnico Recomendado (Técnica Canvas Image Sequence)
Dado que estamos usando Astro y Tailwind CSS, y que Isru es una marca elegante, la forma más performante de lograr este efecto sin bibliotecas 3D pesadas (como Three.js) es usar la técnica de Secuencia de Imágenes de Canvas.

1. **Activo Visual (3D Render Sequence):** 
   - Necesitamos un modelo 3D de nuestro producto estrella (ej. Bolso Azul o Cartera de Piel).
   - Este modelo debe ser renderizado en una secuencia de imágenes (ej. 100 a 150 frames) de alta calidad en formato `.webp` con fondo transparente.
   - Las guardaremos en la carpeta `public/images/3d-sequence/`.

2. **Estructura del Componente (Scroll3D.astro):**
   - Un contenedor con una altura grande (ej. `h-[300vh]`) para permitir un recorrido largo de scroll.
   - Un contenedor interior `sticky top-0 h-screen` que mantendrá el elemento en pantalla mientras hacemos el scroll de los 300vh.
   - Dentro del sticky, el elemento `<canvas>` que ocupará toda la pantalla y dibujará las imágenes correspondientes.

3. **Lógica JavaScript / Animación:**
   - Pre-cargar las 100-150 imágenes de forma inteligente (carga asíncrona) para no bloquear la web.
   - Registrar un controlador de evento de scroll global.
   - Calcular el progreso de nuestra sección `[0, 1]`.
   - Calcular qué frame corresponde (`Math.floor(progress * totalFrames)`).
   - Pintar el frame actual en el contexto 2D del canvas.
   - Sincronizar con `Lenis` (que ya está instalado en el proyecto según el package.json) para asegurar que la animación sea fluida incluso con trackpads o ruedas de ratón irregulares.

## Estilo y Dirección de Arte
- **Ubicación:** Esta sección debería situarse idealmente después del Hero section, sirviendo como una introducción muy inmersiva ("Deep Dive") antes de listar el catálogo de productos.
- **Tipografía y Textos:** Mientras baja el scroll y el bolso/cartera 3D gira en el medio, aparecerán textos elegantes con la fuente `Cinzel` a los lados (izquierda y derecha alternando) describiendo la calidad, los materiales (auténtica piel) y el diseño atemporal.
- **Paleta de Colores:** Mantendremos fondos limpios como `#ffffff` (blanco) oscuro corporativo `#1a1a1a` para generar un contraste dramático que eleve el modelo 3D.
