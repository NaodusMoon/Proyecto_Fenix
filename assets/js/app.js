// --- BASE DE DATOS DE COMBOS SEMANALES CON IMÁGENES ASOCIADAS ---
        const COMBOS = {
            'Lunes': {
                title: "Combo Inicio de Semana",
                items: "Teta cremosa estándar + Bebida sencilla",
                desc: "Ideal para iniciar la semana con un toque dulce y refrescante. Combina cualquiera de nuestros sabores estándar de tetas cremosas con tu bebida favorita.",
                cost: "$2.500 - $3.300",
                price: "$4.800",
                profit: "$1.500 - $2.300",
                rappi: "$6.500",
                image: "assets/images/generated/combo-lunes.webp"
            },
            'Martes': {
                title: "Combo Energía Explosiva",
                items: "Bomba de arequipe + Bebida sencilla",
                desc: "Nuestra bomba esponjosa rellena de un arequipe de altísima calidad combinada con agua o gaseosa para contrarrestar el dulce de la mejor manera.",
                cost: "$4.000 - $4.900",
                price: "$7.200",
                profit: "$2.300 - $3.200",
                rappi: "$9.700",
                image: "assets/images/generated/combo-martes.webp"
            },
            'Miércoles': {
                title: "Combo Mitad de Semana",
                items: "Bomba de crema pastelera + Bebida sencilla",
                desc: "Para sobrellevar el miércoles. Bomba extra tierna rellena de crema pastelera casera, acompañada de una bebida refrescante de tu elección.",
                cost: "$4.100 - $5.000",
                price: "$7.400",
                profit: "$2.400 - $3.300",
                rappi: "$10.000",
                image: "assets/images/generated/combo-miercoles.webp"
            },
            'Jueves': {
                title: "Combo Tradición Premium",
                items: "Quesillo + Bebida especial",
                desc: "Sabor del hogar directo a tu mesa. Porción de quesillo condensado con caramelo brillante y tinto caliente para un contraste exquisito.",
                cost: "$4.800 - $6.200",
                price: "$9.800",
                profit: "$3.600 - $5.000",
                rappi: "$13.200",
                image: "assets/images/generated/combo-jueves.webp"
            },
            'Viernes': {
                title: "Combo Dueto Cremoso",
                items: "2 Tetas cremosas estándar",
                desc: "¡Viernes de compartir o de doble antojo! Elige dos sabores estándar entre Oreo, Coco, Galleta María, Arequipe o Mantecado.",
                cost: "$2.600 - $3.400",
                price: "$5.300",
                profit: "$1.900 - $2.700",
                rappi: "$7.200",
                image: "assets/images/generated/combo-viernes.webp"
            },
            'Sábado': {
                title: "Trío Fénix del Sábado",
                items: "Bomba a elección + Teta estándar + Bebida sencilla",
                desc: "El combo más completo para arrancar el fin de semana. Prueba una de nuestras bombas artesanales, una teta cremosa y un hidratante.",
                cost: "$5.300 - $6.700",
                price: "$10.100",
                profit: "$3.400 - $4.800",
                rappi: "$13.600",
                image: "assets/images/generated/combo-sabado.webp"
            },
            'Domingo': {
                title: "Bandeja Familiar Fénix",
                items: "2 Bombas + 2 Tetas estándar + 1 Quesillo",
                desc: "Diseñado para las tardes de domingo en familia. Una recopilación estelar de nuestros mejores postres para compartir y disfrutar en Bogotá.",
                cost: "$11.200 - $14.000",
                price: "$21.900",
                profit: "$7.900 - $10.700",
                rappi: "$29.600",
                image: "assets/images/generated/combo-domingo.webp"
            }
        };

        // --- CARRITO DE COMPRAS ---
        let cart = [];

        function addToCart(name, price) {
            const itemIndex = cart.findIndex(item => item.name === name);
            if (itemIndex > -1) {
                cart[itemIndex].qty += 1;
            } else {
                cart.push({ name, price, qty: 1 });
            }
            updateCartUI();
            showToast(`¡"${name}" agregado al pedido!`, "fa-ice-cream");
        }

        function clearCart() {
            cart = [];
            updateCartUI();
            showToast("Bandeja vaciada con éxito", "fa-trash-can");
        }

        function updateCartUI() {
            const itemsContainer = document.getElementById('cart-items');
            const cartCount = document.getElementById('cart-count');
            const subtotalEl = document.getElementById('cart-subtotal');
            const totalEl = document.getElementById('cart-total');

            if (cart.length === 0) {
                itemsContainer.innerHTML = '<p class="text-xs text-chocolate-500 text-center py-8 italic">No has agregado dulces a tu bandeja de pedido todavía.</p>';
                cartCount.innerText = "0";
                subtotalEl.innerText = "$0 COP";
                totalEl.innerText = "$0 COP";
                return;
            }

            let html = "";
            let subtotal = 0;
            let count = 0;

            cart.forEach((item, index) => {
                const totalItemPrice = item.price * item.qty;
                subtotal += totalItemPrice;
                count += item.qty;

                html += `
                    <div class="flex items-center justify-between bg-chocolate-50/70 p-2.5 rounded-xl border border-chocolate-100 text-xs">
                        <div class="flex-grow pr-2">
                            <span class="font-bold text-chocolate-900 block">${item.name}</span>
                            <span class="text-chocolate-500">$${item.price.toLocaleString()} x ${item.qty}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-chocolate-800">$${totalItemPrice.toLocaleString()}</span>
                            <button onclick="changeQty(${index}, -1)" class="bg-white text-chocolate-600 hover:bg-red-50 hover:text-red-600 p-1 rounded border border-chocolate-200">
                                <i class="fa-solid fa-minus text-[10px]" aria-hidden="true"></i>
                            </button>
                            <button onclick="changeQty(${index}, 1)" class="bg-white text-chocolate-600 hover:bg-emerald-50 hover:text-emerald-600 p-1 rounded border border-chocolate-200">
                                <i class="fa-solid fa-plus text-[10px]" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                `;
            });

            itemsContainer.innerHTML = html;
            cartCount.innerText = count;
            subtotalEl.innerText = `$${subtotal.toLocaleString()} COP`;
            totalEl.innerText = `$${subtotal.toLocaleString()} COP`;
        }

        function changeQty(index, change) {
            cart[index].qty += change;
            if (cart[index].qty <= 0) {
                cart.splice(index, 1);
            }
            updateCartUI();
        }

        function sendWhatsAppOrder() {
            if (cart.length === 0) {
                showToast("Por favor agrega primero algún postre a tu pedido", "fa-triangle-exclamation");
                return;
            }

            let text = "¡Hola Dulces Fénix!\nMe gustaría realizar la simulación de pedido de los siguientes postres en Bogotá:\n\n";
            let total = 0;
            cart.forEach(item => {
                const totalItem = item.price * item.qty;
                total += totalItem;
                text += `• ${item.name} (x${item.qty}) - $${totalItem.toLocaleString()} COP\n`;
            });
            text += `\n*TOTAL ESTIMADO: $${total.toLocaleString()} COP*\n\n¿Me confirman la disponibilidad de entrega? ¡Gracias!`;

            const encoded = encodeURIComponent(text);
            window.open(`https://wa.me/573000000000?text=${encoded}`, '_blank');
        }


        // --- MANEJO DE SECCIÓN COMBOS SEMANALES CON IMAGENES DINÁMICAS ---
        function selectDay(dayName) {
            // Activar botones visualmente
            document.querySelectorAll('.day-btn').forEach(btn => {
                btn.classList.remove('bg-oro-500', 'text-chocolate-900', 'border-oro-400');
                btn.classList.add('bg-[#FAF8F5]', 'text-chocolate-700', 'border-chocolate-100');
            });

            const activeBtn = document.getElementById(`btn-${dayName}`);
            if (activeBtn) {
                activeBtn.classList.remove('bg-[#FAF8F5]', 'text-chocolate-700', 'border-chocolate-100');
                activeBtn.classList.add('bg-oro-500', 'text-chocolate-900', 'border-oro-400');
            }

            // Actualizar datos de la tarjeta
            const data = COMBOS[dayName];
            
            // Animación suave de transición de imagen
            const comboImg = document.getElementById('combo-image');
            comboImg.style.opacity = '0';
            
            setTimeout(() => {
                comboImg.src = data.image;
                comboImg.style.opacity = '1';
            }, 150);

            document.getElementById('combo-day-badge').innerText = dayName;
            document.getElementById('combo-title').innerText = data.title;
            document.getElementById('combo-desc').innerText = data.desc;
            document.getElementById('combo-cost').innerText = data.cost;
            document.getElementById('combo-price').innerText = data.price;
            document.getElementById('combo-profit').innerText = data.profit;
            document.getElementById('combo-rappi-price').innerText = data.rappi;

            // Configurar botón para agregar combo al pedido
            const addComboBtn = document.getElementById('add-combo-btn');
            // Limpiar listener anterior para evitar duplicación
            addComboBtn.onclick = null;
            addComboBtn.onclick = function() {
                const rawPrice = parseInt(data.price.replace(/[^0-9]/g, ''));
                addToCart(`Combo del ${dayName} (${data.title})`, rawPrice);
            };
        }

        // --- SIMULADOR FINANCIERO DINÁMICO ---
        function recalcSimulator() {
            // Costos base estables para Dulces Fénix
            const costs = {
                tetaStd: 1500, // Punto medio aproximado de la materia prima teta estándar
                tetaPrem: 1900, // Materia prima teta Fresa Nutella
                bombaAq: 3050, // Costo bomba arequipe
                bombaCp: 3150, // Costo bomba pastelera
                quesillo: 3400 // Costo quesillo individual
            };

            // Lectura de los Precios Ingresados por el Usuario
            const prices = {
                tetaStd: Math.max(costs.tetaStd, parseInt(document.getElementById('input-teta-std').value) || 0),
                tetaPrem: Math.max(costs.tetaPrem, parseInt(document.getElementById('input-teta-prem').value) || 0),
                bombaAq: Math.max(costs.bombaAq, parseInt(document.getElementById('input-bomba-aq').value) || 0),
                bombaCp: Math.max(costs.bombaCp, parseInt(document.getElementById('input-bomba-cp').value) || 0),
                quesillo: Math.max(costs.quesillo, parseInt(document.getElementById('input-quesillo').value) || 0)
            };

            // Cálculo Teta Estándar
            const tetaStdProfit = prices.tetaStd - costs.tetaStd;
            const tetaStdMargin = Math.round((tetaStdProfit / prices.tetaStd) * 100) || 0;
            document.getElementById('val-teta-std-profit').innerText = `$${tetaStdProfit.toLocaleString()}`;
            document.getElementById('val-teta-std-margin').innerText = `${tetaStdMargin}%`;
            setSustainBadge('sim-row-1', tetaStdMargin);

            // Cálculo Teta Premium
            const tetaPremProfit = prices.tetaPrem - costs.tetaPrem;
            const tetaPremMargin = Math.round((tetaPremProfit / prices.tetaPrem) * 100) || 0;
            document.getElementById('val-teta-prem-profit').innerText = `$${tetaPremProfit.toLocaleString()}`;
            document.getElementById('val-teta-prem-margin').innerText = `${tetaPremMargin}%`;
            setSustainBadge('sim-row-2', tetaPremMargin);

            // Cálculo Bomba Arequipe
            const bombaAqProfit = prices.bombaAq - costs.bombaAq;
            const bombaAqMargin = Math.round((bombaAqProfit / prices.bombaAq) * 100) || 0;
            document.getElementById('val-bomba-aq-profit').innerText = `$${bombaAqProfit.toLocaleString()}`;
            document.getElementById('val-bomba-aq-margin').innerText = `${bombaAqMargin}%`;
            setSustainBadge('sim-row-3', bombaAqMargin);

            // Cálculo Bomba Pastelera
            const bombaCpProfit = prices.bombaCp - costs.bombaCp;
            const bombaCpMargin = Math.round((bombaCpProfit / prices.bombaCp) * 100) || 0;
            document.getElementById('val-bomba-cp-profit').innerText = `$${bombaCpProfit.toLocaleString()}`;
            document.getElementById('val-bomba-cp-margin').innerText = `${bombaCpMargin}%`;
            setSustainBadge('sim-row-4', bombaCpMargin);

            // Cálculo Quesillo
            const quesilloProfit = prices.quesillo - costs.quesillo;
            const quesilloMargin = Math.round((quesilloProfit / prices.quesillo) * 100) || 0;
            document.getElementById('val-quesillo-profit').innerText = `$${quesilloProfit.toLocaleString()}`;
            document.getElementById('val-quesillo-margin').innerText = `${quesilloMargin}%`;
            setSustainBadge('sim-row-5', quesilloMargin);
        }

        function setSustainBadge(rowId, margin) {
            const row = document.getElementById(rowId);
            const badgeCell = row.cells[5];
            
            let color = "bg-red-100 text-red-800";
            let label = "Crítico";

            if (margin >= 40) {
                color = "bg-emerald-100 text-emerald-800";
                label = "Excelente";
            } else if (margin >= 20) {
                color = "bg-yellow-100 text-yellow-800";
                label = "Aceptable";
            }

            badgeCell.innerHTML = `<span class="${color} px-2 py-0.5 rounded text-[10px] font-bold">${label}</span>`;
        }


        // --- MANEJO DE PESTAÑAS (SECCIÓN REQUISITOS ACADÉMICOS) ---
        function switchTab(tabId) {
            // Ocultar todos los contenidos de pestaña
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            // Quitar estilos activos de los botones de pestaña
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('bg-white/5', 'border-white/10', 'text-white');
                btn.classList.add('bg-transparent', 'border-transparent', 'text-chocolate-200');
            });

            // Mostrar el contenido seleccionado
            document.getElementById(`content-${tabId}`).classList.remove('hidden');
            // Aplicar estilo activo al botón presionado
            const activeBtn = document.getElementById(`tab-${tabId}`);
            activeBtn.classList.remove('bg-transparent', 'border-transparent', 'text-chocolate-200');
            activeBtn.classList.add('bg-white/5', 'border-white/10', 'text-white');
        }


        // --- TOAST NOTIFICATIONS ---
        let toastTimeout;
        function showToast(text, icon = "fa-wand-magic-sparkles") {
            const toast = document.getElementById('toast-modal');
            const toastText = document.getElementById('toast-text');
            const toastIcon = document.getElementById('toast-icon');

            toastText.innerText = text;
            toastIcon.className = `${icon.includes(' ') ? icon : `fa-solid ${icon}`} text-oro-400`;

            clearTimeout(toastTimeout);
            toast.classList.remove('translate-y-32', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            toastTimeout = setTimeout(() => {
                toast.classList.add('translate-y-32', 'opacity-0');
                toast.classList.remove('translate-y-0', 'opacity-100');
            }, 3000);
        }

        // --- INICIALIZACIÓN ---
        window.onload = function() {
            // Auto-seleccionar combo del día actual de la semana en Colombia
            const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const todayIndex = new Date().getDay();
            const todayName = days[todayIndex];
            selectDay(todayName);

            // Ajustar un indicador especial al combo seleccionado
            const todayBtn = document.getElementById(`btn-${todayName}`);
            if (todayBtn) {
                todayBtn.innerHTML += ` <span class="bg-oro-900 text-oro-400 text-[8px] px-1 rounded ml-1 font-black">Hoy</span>`;
            }

            // Inicializar cálculos del simulador escolar
            recalcSimulator();
        }

