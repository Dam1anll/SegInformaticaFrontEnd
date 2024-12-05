export interface topcard {
    bgcolor: string,
    title: string,
    subtitle: string,
    href: string
}

export const topcards: topcard[] = [
    {
        bgcolor: 'success',
        title: '¿Qué es AES-256?',
        subtitle: 'Es un algoritmo de cifrado simétrico ampliamente utilizado para proteger datos sensibles. Fue establecido como estándar de cifrado por el Instituto Nacional de Estándares y Tecnología (NIST) en 2001 y es reconocido por su alta seguridad y eficiencia.',
        href: ''
    },
    {
        bgcolor: 'primary',
        title: 'Estructura',
        subtitle: 'AES es un cifrado por bloques, lo que significa que divide los datos en fragmentos (bloques) de tamaño fijo de 128 bits para procesarlos. Cada bloque pasa por varias rondas de transformación que involucran operaciones matemáticas complejas para garantizar la seguridad.',
        href: ''
    },
    {
        bgcolor: 'warning',
        title: 'Funcionamiento de AES-256',
        subtitle: 'AES-256 opera sobre bloques de datos de 128 bits, dividiendo la información en partes manejables para su procesamiento. Cada bloque pasa por 14 rondas de transformaciones matemáticas que convierten los datos en un formato cifrado. Estas rondas incluyen sustituciones, permutaciones y combinaciones de datos para hacer que la información sea prácticamente imposible de descifrar sin la clave correcta.',
        href: ''
    },
    {
        bgcolor: 'info',
        title: 'Aplicaciones de AES-256',
        subtitle: 'AES-256 se utiliza en una amplia variedad de aplicaciones para proteger datos. Es fundamental en protocolos de seguridad de Internet como HTTPS, que asegura la comunicación entre navegadores y servidores web. También es empleado para cifrar discos duros, bases de datos y dispositivos móviles, garantizando la protección de la información en caso de pérdida o robo.',
        href: ''
    }
] 