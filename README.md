# SpendPulse ⌚📱
### Ecosistema de Finanzas Personales para Smartwatch y Smartphone
**Materia:** Desarrollo de Dispositivos Inteligentes — Cuatrimestre 9 (Examen Unidad 2)

---

## 📌 1. Planteamiento del Problema y Sectores Atendidos

1. **Sector Económico / Financiero:**
   * Control de **gastos hormiga** (café, botanas, transporte informal, propinas) que provocan fugas considerables del presupuesto mensual.
   * Regla de semáforo de presupuesto diario en tiempo real (Verde, Amarillo, Rojo).

2. **Problema de la Vida Cotidiana:**
   * La incomodidad y riesgo de seguridad de sacar el teléfono en la vía pública o transporte para registrar importes menores.
   * Registro en **menos de 3 segundos con 1 toque en la muñeca**.

---

## 🏗️ 2. Arquitectura de Dispositivos

### ⌚ Smartwatch
* **Formato Rectangular Ergonómico:** Proporciones adaptadas a pantallas de reloj inteligente modernas (estilo Apple Watch).
* **Botones a Ancho Completo (*Full-Width Pills*):** Áreas táctiles de 44px de altura optimizadas para pulsación con el pulgar sin errores.
* **Tarjeta de Balance Rápido:** Indicador de semáforo dinámico, saldo restante a 32px bold y barra horizontal de progreso.
* **Digital Crown Funcional:** Botón físico interactivo que activa la función de revertir/deshacer el último gasto.
* **Tolerancia Offline:** Cola local que almacena gastos si se suspende la conexión Bluetooth y los sincroniza al reconectarse.

### 📱 Smartphone (Companion App)
* **Panel de Control Financiero:** Seguimiento de balance diario y mensual con gráfica por categorías.
* **Filtro de Historial por Origen:** Pestañas para segmentar gastos: `Todos`, `Smartwatch` y `Smartphone`.
* **Configurador Remoto:** Posibilidad de cambiar nombres, montos y colores de los accesos directos del reloj desde el celular.
* **Modales Encapsulados:** Los formularios de nuevo gasto, límites y configuración se despliegan estrictamente dentro del marco del teléfono.
* **Sincronización en Tiempo Real:** Integración con `BroadcastChannel` para comunicación instantánea incluso entre pestañas o navegadores independientes.

---

## 🚀 3. Ejecución del Proyecto

El servidor de desarrollo está activo en:
👉 **`http://localhost:8082`**

Para iniciar manualmente en la terminal:
```bash
npx expo start --web
```
