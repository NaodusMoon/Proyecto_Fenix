// --- BASE DE DATOS DE COMBOS SEMANALES CON IMÁGENES ASOCIADAS ---
        const COMBOS = {
            'Lunes': {
                title: "Combo Inicio de Semana",
                items: "Copito cremoso estándar + Bebida sencilla",
                desc: "Ideal para iniciar la semana con un toque dulce y refrescante: combina cualquiera de nuestros sabores estándar de copitos cremosos con tu bebida favorita.",
                cost: "$2.500 - $3.300",
                price: "$4.800",
                profit: "$1.500 - $2.300",
                rappi: "$6.200",
                image: "assets/images/generated/combo-lunes.png"
            },
            'Martes': {
                title: "Combo Energía Explosiva",
                items: "Bomba de arequipe + Bebida sencilla",
                desc: "Bomba esponjosa rellena de arequipe, acompañada con agua o gaseosa para equilibrar el dulce.",
                cost: "$4.000 - $4.900",
                price: "$7.200",
                profit: "$2.300 - $3.200",
                rappi: "$9.300",
                image: "assets/images/generated/combo-martes.png"
            },
            'Miércoles': {
                title: "Combo Mitad de Semana",
                items: "Bomba de crema pastelera + Bebida sencilla",
                desc: "Bomba tierna rellena de crema pastelera casera, acompañada de una bebida sencilla.",
                cost: "$4.100 - $5.000",
                price: "$7.400",
                profit: "$2.400 - $3.300",
                rappi: "$9.600",
                image: "assets/images/generated/combo-miercoles.png"
            },
            'Jueves': {
                title: "Combo Tradición Premium",
                items: "Quesillo + Bebida especial",
                desc: "Porción de quesillo con caramelo, acompañada de una bebida especial como tinto o café.",
                cost: "$4.800 - $6.200",
                price: "$9.800",
                profit: "$3.600 - $5.000",
                rappi: "$12.700",
                image: "assets/images/generated/combo-jueves.png"
            },
            'Viernes': {
                title: "Combo Dueto Cremoso",
                items: "2 Copitos cremosos estándar",
                desc: "Viernes de compartir o de doble antojo: elige dos sabores estándar entre Oreo, Coco, Galleta María, Arequipe o Mantecado.",
                cost: "$2.600 - $3.400",
                price: "$5.300",
                profit: "$1.900 - $2.700",
                rappi: "$6.900",
                image: "assets/images/generated/combo-viernes.png"
            },
            'Sábado': {
                title: "Trío Fénix del Sábado",
                items: "Bomba a elección + Copito estándar + Bebida sencilla",
                desc: "Bomba a elección, copito cremoso estándar y bebida sencilla para un combo completo de sábado.",
                cost: "$5.300 - $6.700",
                price: "$10.100",
                profit: "$3.400 - $4.800",
                rappi: "$13.100",
                image: "assets/images/generated/combo-sabado.png"
            },
            'Domingo': {
                title: "Bandeja Familiar Fénix",
                items: "2 Bombas + 2 Copitos estándar + 1 Quesillo",
                desc: "Combo familiar con dos bombas, dos copitos cremosos estándar y una porción de quesillo.",
                cost: "$11.200 - $14.000",
                price: "$21.900",
                profit: "$7.900 - $10.700",
                rappi: "$28.500",
                image: "assets/images/generated/combo-domingo.png"
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

            let text = "¡Hola Dulces Zynareth!\nMe gustaría realizar la simulación de pedido de los siguientes postres en Bogotá:\n\n";
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
            // Costos base estables para Dulces Zynareth
            const costs = {
                copitoStd: 1500, // Punto medio aproximado de la materia prima copito estándar
                copitoPrem: 1900, // Materia prima copito Fresa Nutella
                bombaAq: 3050, // Costo bomba arequipe
                bombaCp: 3150, // Costo bomba pastelera
                quesillo: 3400 // Costo quesillo individual
            };

            // Lectura de los Precios Ingresados por el Usuario
            const prices = {
                copitoStd: Math.max(costs.copitoStd, parseInt(document.getElementById('input-copito-std').value) || 0),
                copitoPrem: Math.max(costs.copitoPrem, parseInt(document.getElementById('input-copito-prem').value) || 0),
                bombaAq: Math.max(costs.bombaAq, parseInt(document.getElementById('input-bomba-aq').value) || 0),
                bombaCp: Math.max(costs.bombaCp, parseInt(document.getElementById('input-bomba-cp').value) || 0),
                quesillo: Math.max(costs.quesillo, parseInt(document.getElementById('input-quesillo').value) || 0)
            };

            // Cálculo Copito Estándar
            const copitoStdProfit = prices.copitoStd - costs.copitoStd;
            const copitoStdMargin = Math.round((copitoStdProfit / prices.copitoStd) * 100) || 0;
            document.getElementById('val-copito-std-profit').innerText = `$${copitoStdProfit.toLocaleString()}`;
            document.getElementById('val-copito-std-margin').innerText = `${copitoStdMargin}%`;
            setSustainBadge('sim-row-1', copitoStdMargin);

            // Cálculo Copito Premium
            const copitoPremProfit = prices.copitoPrem - costs.copitoPrem;
            const copitoPremMargin = Math.round((copitoPremProfit / prices.copitoPrem) * 100) || 0;
            document.getElementById('val-copito-prem-profit').innerText = `$${copitoPremProfit.toLocaleString()}`;
            document.getElementById('val-copito-prem-margin').innerText = `${copitoPremMargin}%`;
            setSustainBadge('sim-row-2', copitoPremMargin);

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

        function closeMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            const button = document.getElementById('mobile-menu-btn');
            const icon = document.getElementById('mobile-menu-icon');

            if (!menu || !button || !icon) return;

            menu.classList.add('hidden');
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-label', 'Abrir menú');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            const button = document.getElementById('mobile-menu-btn');
            const icon = document.getElementById('mobile-menu-icon');

            if (!menu || !button || !icon) return;

            const willOpen = menu.classList.contains('hidden');
            menu.classList.toggle('hidden', !willOpen);
            button.setAttribute('aria-expanded', String(willOpen));
            button.setAttribute('aria-label', willOpen ? 'Cerrar menú' : 'Abrir menú');
            icon.classList.toggle('fa-bars', !willOpen);
            icon.classList.toggle('fa-xmark', willOpen);
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) closeMobileMenu();
        });

        // --- GRÁFICO INTERACTIVO DE PARTICIPACIÓN SOCIETARIA ---
        function initializeTeamPie() {
            const chart = document.querySelector('.team-pie-chart');
            const detail = document.getElementById('team-pie-detail');
            if (!chart || !detail) return;

            const members = {
                juan: { name: 'Juan Sebastian', capital: '$4.000.000 COP', percentage: '40,17%' },
                julieth: { name: 'Julieth Stefanie', capital: '$4.000.000 COP', percentage: '40,17%' },
                estefani: { name: 'Estefani Andreina', capital: '$1.500.000 COP', percentage: '15,06%' },
                jader: { name: 'Jader Jefte', capital: '$458.000 COP', percentage: '4,60%' }
            };

            const selectMember = (memberId) => {
                const member = members[memberId];
                if (!member) return;

                document.querySelectorAll('[data-pie-member]').forEach((element) => {
                    const isSelected = element.dataset.pieMember === memberId;
                    element.classList.toggle('is-active', isSelected);
                    if (element.classList.contains('team-pie-hit')) {
                        element.setAttribute('aria-pressed', String(isSelected));
                    }
                });

                chart.setAttribute('aria-label', `${member.name}: aporte de ${member.capital}, ${member.percentage} del capital social`);
                detail.innerHTML = `<i class="fa-solid fa-hand-pointer"></i><span><strong>${member.name}</strong> aportó ${member.capital}; representa el ${member.percentage} del capital</span>`;
            };

            document.querySelectorAll('[data-pie-member]').forEach((element) => {
                element.addEventListener('mouseenter', () => selectMember(element.dataset.pieMember));
                element.addEventListener('focus', () => selectMember(element.dataset.pieMember));
                element.addEventListener('click', () => selectMember(element.dataset.pieMember));
                element.addEventListener('keydown', (event) => {
                    if ((event.key === 'Enter' || event.key === ' ') && element.classList.contains('team-pie-hit')) {
                        event.preventDefault();
                        selectMember(element.dataset.pieMember);
                    }
                });
            });

            selectMember('juan');
        }

        // --- REFERENCIA VISUAL DEL PRODUCTO COMPETIDOR ---
        function enhanceCompetitorComparison() {
            const sourceUrl = 'https://www.aurypostres.com/picadas?menu=pasteleria';
            const sourceImage = 'https://static.wixstatic.com/media/9162b4_a9d6d36e460344b0b055442e8673cfae~mv2.jpg';
            const brand = Array.from(document.querySelectorAll('span')).find((element) => element.textContent.trim() === 'Aury Postres');
            if (!brand) return;

            const competitorCard = brand.closest('.rounded-2xl');
            const visual = competitorCard?.querySelector(':scope > div:first-child');
            if (!competitorCard || !visual) return;

            visual.innerHTML = `<a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" aria-label="Abrir menú de Aury Postres" style="display:block;width:100%;height:100%;overflow:hidden"><img src="${sourceImage}" alt="Fotografía de pastelería publicada por Aury Postres" style="display:block;width:100%;height:100%;object-fit:cover;transition:transform 250ms ease" onmouseenter="this.style.transform='scale(1.05)'" onmouseleave="this.style.transform='scale(1)'"></a>`;
            brand.outerHTML = `<a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-[10px] uppercase font-bold text-chocolate-600 underline underline-offset-2" aria-label="Abrir menú de Aury Postres">Aury Postres <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i></a>`;
        }

        // --- MERCADO OBJETIVO: DECISIONES ÚTILES PARA VENTAS ---
        function refineTargetMarket() {
            const profileTitle = Array.from(document.querySelectorAll('h3')).find((element) => element.textContent.trim() === 'Buyer persona: Valentina');
            const matrixTitle = Array.from(document.querySelectorAll('h3')).find((element) => element.textContent.trim() === 'Matriz de tres competidores');
            const profileCard = profileTitle?.closest('article');
            const matrixCard = matrixTitle?.closest('article');

            if (profileCard) {
                profileCard.innerHTML = `<div class="w-16 h-16 rounded-full bg-oro-500 text-chocolate-900 flex items-center justify-center text-2xl"><i class="fa-solid fa-bullseye"></i></div><h3 class="font-serif text-2xl font-bold mt-5">Cliente prioritario: Valentina</h3><p class="text-oro-400 text-xs mt-1">19 años · estudiante · compra en Bogotá</p><p class="text-xs text-chocolate-200 mt-5">Este perfil sirve para tomar decisiones de venta, no para describir a una persona real</p><div class="mt-5 space-y-3 text-xs"><div class="rounded-xl bg-white/10 p-3"><strong class="text-oro-300">Producto:</strong> copito o bomba individual para el antojo después de clase</div><div class="rounded-xl bg-white/10 p-3"><strong class="text-oro-300">Precio:</strong> rango claro de $5.000 a $12.000 por compra</div><div class="rounded-xl bg-white/10 p-3"><strong class="text-oro-300">Canal:</strong> fotos reales y pedido rápido por WhatsApp</div></div>`;
            }

            if (matrixCard) {
                const marketGrid = matrixCard.parentElement;
                matrixCard.remove();
                marketGrid?.classList.remove('lg:grid-cols-3');
                marketGrid?.classList.add('lg:grid-cols-2');
            }
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
            initializeTeamPie();
            enhanceCompetitorComparison();
            refineTargetMarket();
        }

