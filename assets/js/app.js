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
            const comparisonTitle = Array.from(document.querySelectorAll('h3')).find((element) => element.textContent.trim() === 'Bomba Zynareth frente a un producto comparable');
            const comparisonCard = comparisonTitle?.closest('article');
            if (!comparisonCard) return;

            const caiboUrl = 'https://www.rappi.com.co/restaurantes/900076441-caibo-bakery';
            const panCaseroUrl = 'https://www.rappi.com.co/restaurantes/900284778-pan-casero-cafe';
            const comparisons = [
                {
                    ownName: 'Bomba de arequipe', ownPrice: '$5.200', ownImage: 'assets/images/generated/bomba-arequipe.webp', ownDetail: 'Masa frita y relleno de arequipe.',
                    brand: 'Caibo Bakery', product: 'Bomba rellena de chocoarequipe', price: '$8.700', image: 'https://images.rappi.com/products/f7571f72-8bd5-4e0f-ba62-75fd6cc33e68.png?d=800x800&e=webp&q=80', detail: 'Oferta de bombas con chocoarequipe o crema pastelera.', source: caiboUrl, saving: '$3.500 menos'
                },
                {
                    ownName: 'Quesillo', ownPrice: '$7.000', ownImage: 'assets/images/generated/quesillo.webp', ownDetail: 'Textura suave y caramelo artesanal.',
                    brand: 'Caibo Bakery', product: 'Quesillo venezolano', price: '$9.500', image: 'https://images.rappi.com/products/f9dbf264-b538-4587-9221-d78763a619e7.png?d=800x800&e=webp&q=80', detail: 'Textura suave y cubierta de caramelo.', source: caiboUrl, saving: '$2.500 menos'
                },
                {
                    ownName: 'Bomba de crema pastelera', ownPrice: '$5.500', ownImage: 'assets/images/generated/bomba-crema-pastelera.webp', ownDetail: 'Masa suave y crema pastelera.',
                    brand: 'Pan Casero Café', product: 'Bomba de crema pastelera', price: '$13.800', image: 'https://images.rappi.com/products/2095330505-1677241361420.jpg?d=800x800&e=webp&q=80', detail: 'Masa brioche rellena de crema pastelera.', source: panCaseroUrl, saving: '$8.300 menos'
                }
            ];

            const comparisonMarkup = comparisons.map((item, index) => `
                <div class="comparison-slide w-full shrink-0 px-1" role="group" aria-roledescription="diapositiva" aria-label="Comparación ${index + 1} de ${comparisons.length}">
                <article class="rounded-2xl border border-chocolate-100 bg-chocolate-50/70 p-3">
                    <div class="grid grid-cols-[1fr_auto_1fr] gap-2 items-stretch text-center">
                        <div class="rounded-xl overflow-hidden border border-oro-400 bg-white">
                            <img src="${item.ownImage}" alt="${item.ownName} de Dulces Zynareth" class="w-full h-20 object-cover">
                            <div class="p-2"><span class="text-[9px] uppercase font-bold text-oro-700">Zynareth</span><p class="font-bold text-xs mt-0.5 leading-tight">${item.ownName}</p><strong class="block text-base text-chocolate-900 mt-1">${item.ownPrice}</strong><p class="text-[9px] text-chocolate-600 mt-1 leading-tight">${item.ownDetail}</p></div>
                        </div>
                        <div class="flex items-center font-serif font-bold text-oro-600 text-sm">VS</div>
                        <a href="${item.source}" target="_blank" rel="noopener noreferrer" class="rounded-xl overflow-hidden border border-chocolate-200 bg-white hover:border-oro-400 transition-colors" aria-label="Abrir referencia de ${item.product} en ${item.brand}">
                            <img src="${item.image}" alt="${item.product} de ${item.brand}" class="w-full h-20 object-cover">
                            <div class="p-2"><span class="text-[9px] uppercase font-bold text-chocolate-600 underline underline-offset-2">${item.brand} <i class="fa-solid fa-arrow-up-right-from-square text-[8px]"></i></span><p class="font-bold text-xs mt-0.5 leading-tight">${item.product}</p><strong class="block text-base text-chocolate-900 mt-1">${item.price}</strong><p class="text-[9px] text-chocolate-600 mt-1 leading-tight">${item.detail}</p></div>
                        </a>
                    </div>
                    <p class="text-[10px] text-chocolate-700 mt-2"><strong>Lectura:</strong> Zynareth ofrece una alternativa de ${item.saving} frente a esta referencia.</p>
                </article></div>`).join('');

            comparisonCard.innerHTML = `<span class="text-oro-600 font-bold text-xs uppercase">Comparación visual · referencias comerciales reales</span><h3 class="font-serif text-2xl font-bold mt-2">Tres productos Zynareth frente a referencias de Bogotá</h3><p class="text-xs text-chocolate-600 mt-2">Productos equivalentes, cada uno con su imagen y acceso directo a la ficha comercial.</p><div class="comparison-carousel relative mt-5" aria-roledescription="carrusel" aria-label="Comparaciones de productos"><div class="overflow-hidden"><div class="comparison-carousel-track flex transition-transform duration-500 ease-out">${comparisonMarkup}</div></div><button type="button" data-comparison-prev class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 border border-chocolate-200 text-chocolate-800 shadow-md hover:bg-oro-400 focus:outline-none focus:ring-2 focus:ring-oro-500" aria-label="Ver comparación anterior"><i class="fa-solid fa-chevron-left"></i></button><button type="button" data-comparison-next class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 border border-chocolate-200 text-chocolate-800 shadow-md hover:bg-oro-400 focus:outline-none focus:ring-2 focus:ring-oro-500" aria-label="Ver comparación siguiente"><i class="fa-solid fa-chevron-right"></i></button><div class="flex justify-center gap-2 mt-3">${comparisons.map((item, index) => `<button type="button" data-comparison-dot="${index}" class="h-2.5 rounded-full transition-all ${index === 0 ? 'w-7 bg-oro-500' : 'w-2.5 bg-chocolate-200'}" aria-label="Ver comparación ${index + 1}: ${item.ownName}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('')}</div></div><p class="text-[10px] text-chocolate-500 mt-4">El carrusel avanza automáticamente cada pocos segundos; usa las flechas o los indicadores para navegar. Precios, descripciones y fotografías públicas consultados el 31 de agosto de 2026.</p>`;

            const carousel = comparisonCard.querySelector('.comparison-carousel');
            const track = carousel?.querySelector('.comparison-carousel-track');
            const dots = Array.from(carousel?.querySelectorAll('[data-comparison-dot]') || []);
            const previous = carousel?.querySelector('[data-comparison-prev]');
            const next = carousel?.querySelector('[data-comparison-next]');
            if (!carousel || !track || !previous || !next) return;

            let activeComparison = 0;
            let autoplay;
            const showComparison = (index) => {
                activeComparison = (index + comparisons.length) % comparisons.length;
                track.style.transform = `translateX(-${activeComparison * 100}%)`;
                dots.forEach((dot, dotIndex) => {
                    const selected = dotIndex === activeComparison;
                    dot.className = `h-2.5 rounded-full transition-all ${selected ? 'w-7 bg-oro-500' : 'w-2.5 bg-chocolate-200 hover:bg-oro-300'}`;
                    dot.setAttribute('aria-current', String(selected));
                });
            };
            const stopAutoplay = () => { if (autoplay) window.clearInterval(autoplay); };
            const startAutoplay = () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                stopAutoplay();
                autoplay = window.setInterval(() => showComparison(activeComparison + 1), 6500);
            };
            previous.addEventListener('click', () => { showComparison(activeComparison - 1); startAutoplay(); });
            next.addEventListener('click', () => { showComparison(activeComparison + 1); startAutoplay(); });
            dots.forEach((dot, index) => dot.addEventListener('click', () => { showComparison(index); startAutoplay(); }));
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
            carousel.addEventListener('focusin', stopAutoplay);
            carousel.addEventListener('focusout', (event) => { if (!carousel.contains(event.relatedTarget)) startAutoplay(); });
            startAutoplay();
        }

        // --- DATOS VERIFICADOS DE LAS HOJAS P-02 / P-03 ---
        function applySchoolBusinessData() {
            const menuData = [
                { name: 'Copito Oreo', price: 4000 },
                { name: 'Copito Coco', price: 4000 },
                { name: 'Copito Galleta María', price: 4000 },
                { name: 'Copito Arequipe', price: 4000 },
                { name: 'Copito Mantecado', price: 4000 },
                { name: 'Copito Fresa Nutella', price: 4500 },
                { name: 'Bomba de Crema Pastelera', price: 5500 },
                { name: 'Quesillo', price: 7000 }
            ];

            menuData.forEach(({ name, price }) => {
                const button = Array.from(document.querySelectorAll('button[onclick*="addToCart"]'))
                    .find((element) => element.getAttribute('onclick')?.includes(`'${name}'`));
                if (!button) return;
                button.setAttribute('onclick', `addToCart('${name}', ${price})`);
                const card = button.closest('.bg-white');
                const priceTag = card?.querySelector('.absolute.rounded-full, .absolute.rounded-lg');
                if (priceTag && priceTag.textContent.includes('$')) priceTag.textContent = `$${price.toLocaleString('es-CO')}`;
            });

            const simulatorNote = document.querySelector('#simulador .text-chocolate-600');
            if (simulatorNote) {
                simulatorNote.textContent = 'Los costos y precios iniciales corresponden a las hojas P-02 y P-03 entregadas por el equipo. Al ajustar un precio se recalculan la ganancia bruta y el margen.';
            }

            const simulatorBox = document.querySelector('#simulador .bg-white.rounded-3xl');
            if (simulatorBox && !document.getElementById('academic-19-note')) {
                const note = document.createElement('p');
                note.id = 'academic-19-note';
                note.className = 'mt-5 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-chocolate-700';
                note.innerHTML = '<strong>Lectura de la hoja P-03:</strong> las cifras “ganancia por unidad” anotadas por el equipo aplican un ajuste académico del 19% sobre la ganancia bruta: Copitos $2.025, Copito Nutella $2.106, Bomba de arequipe $1.741, Bomba pastelera $1.904 y Quesillo $2.916. El simulador muestra ganancia bruta; este ajuste no sustituye una liquidación tributaria.';
                simulatorBox.append(note);
            }
        }

        // --- FICHAS TÉCNICAS VISUALES P-03 / P-04 ---
        function addTechnicalProductSection() {
            if (document.getElementById('producto-tecnico')) return;
            const simulator = document.getElementById('simulador');
            if (!simulator) return;

            const section = document.createElement('section');
            section.id = 'producto-tecnico';
            section.className = 'py-20 bg-[#fffdf9]';
            section.innerHTML = `
                <div class="max-w-7xl mx-auto px-6">
                    <div class="text-center max-w-3xl mx-auto mb-12">
                        <span class="text-oro-600 font-bold text-sm uppercase tracking-wider">P-03 y P-04 · Fichas técnicas visuales</span>
                        <h2 class="font-serif text-3xl md:text-4xl font-extrabold mt-2 text-chocolate-900">Productos hechos para disfrutarse y volver a pedir</h2>
                        <p class="text-chocolate-600 text-sm mt-3">Cada ficha muestra el producto antes de describirlo, sus insumos clave, la necesidad que atiende, su formato y el valor que aporta.</p>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <article class="overflow-hidden rounded-3xl bg-white border border-chocolate-100 shadow-sm">
                            <img src="assets/images/generated/copito-oreo-real.webp" alt="Copito cremoso de Dulces Zynareth" class="w-full h-52 object-cover">
                            <div class="p-6">
                                <div class="flex items-center justify-between gap-3"><h3 class="font-serif text-2xl font-bold text-chocolate-900">Copitos</h3><strong class="text-oro-700">$4.000</strong></div>
                                <p class="text-sm text-chocolate-600 mt-3">Dulce artesanal cremoso, caracterizado por su forma de pico y sabores como Oreo, coco, Galleta María, arequipe y mantecado.</p>
                                <div class="grid grid-cols-2 gap-3 text-xs mt-5">
                                    <div class="rounded-2xl bg-amber-50 p-3"><i class="fa-solid fa-box-open text-oro-600"></i><strong class="block mt-1">Insumos</strong><span>Leche, azúcar, sabor, bolsa y empaque.</span></div>
                                    <div class="rounded-2xl bg-emerald-50 p-3"><i class="fa-solid fa-face-smile text-emerald-600"></i><strong class="block mt-1">Necesidad</strong><span>Antojo frío, cremoso y diferente.</span></div>
                                    <div class="rounded-2xl bg-blue-50 p-3"><i class="fa-solid fa-snowflake text-blue-600"></i><strong class="block mt-1">Formato</strong><span>Unidad individual congelada.</span></div>
                                    <div class="rounded-2xl bg-rose-50 p-3"><i class="fa-solid fa-star text-rose-500"></i><strong class="block mt-1">Valor</strong><span>Sabores variados, hechos artesanalmente.</span></div>
                                </div>
                            </div>
                        </article>
                        <article class="overflow-hidden rounded-3xl bg-white border border-chocolate-100 shadow-sm">
                            <img src="assets/images/generated/bomba-arequipe.png" alt="Bomba de arequipe de Dulces Zynareth" class="w-full h-52 object-cover">
                            <div class="p-6">
                                <div class="flex items-center justify-between gap-3"><h3 class="font-serif text-2xl font-bold text-chocolate-900">Bombas</h3><strong class="text-oro-700">$5.200–$5.500</strong></div>
                                <p class="text-sm text-chocolate-600 mt-3">Preparación dulce redonda de masa suave, con relleno de arequipe o crema pastelera, elaborada por tandas.</p>
                                <div class="grid grid-cols-2 gap-3 text-xs mt-5">
                                    <div class="rounded-2xl bg-amber-50 p-3"><i class="fa-solid fa-box-open text-oro-600"></i><strong class="block mt-1">Insumos</strong><span>Harina, levadura, huevo, relleno y aceite.</span></div>
                                    <div class="rounded-2xl bg-emerald-50 p-3"><i class="fa-solid fa-face-smile text-emerald-600"></i><strong class="block mt-1">Necesidad</strong><span>Dulce relleno, suave y reconfortante.</span></div>
                                    <div class="rounded-2xl bg-blue-50 p-3"><i class="fa-solid fa-snowflake text-blue-600"></i><strong class="block mt-1">Formato</strong><span>Unidad física, venta directa o en combo.</span></div>
                                    <div class="rounded-2xl bg-rose-50 p-3"><i class="fa-solid fa-star text-rose-500"></i><strong class="block mt-1">Valor</strong><span>Elección de relleno y producción fresca.</span></div>
                                </div>
                            </div>
                        </article>
                        <article class="overflow-hidden rounded-3xl bg-white border border-chocolate-100 shadow-sm">
                            <img src="assets/images/generated/quesillo.png" alt="Quesillo de Dulces Zynareth" class="w-full h-52 object-cover" onerror="this.src='assets/images/content/quesillo.jpg'">
                            <div class="p-6">
                                <div class="flex items-center justify-between gap-3"><h3 class="font-serif text-2xl font-bold text-chocolate-900">Quesillo</h3><strong class="text-oro-700">$7.000</strong></div>
                                <p class="text-sm text-chocolate-600 mt-3">Dulce de textura suave y cremosa, cubierto con caramelo artesanal, pensado para cerrar una comida con un sabor agradable.</p>
                                <div class="grid grid-cols-2 gap-3 text-xs mt-5">
                                    <div class="rounded-2xl bg-amber-50 p-3"><i class="fa-solid fa-box-open text-oro-600"></i><strong class="block mt-1">Insumos</strong><span>Leche, huevos, azúcar y caramelo.</span></div>
                                    <div class="rounded-2xl bg-emerald-50 p-3"><i class="fa-solid fa-face-smile text-emerald-600"></i><strong class="block mt-1">Necesidad</strong><span>Postre cremoso y de sabor suave.</span></div>
                                    <div class="rounded-2xl bg-blue-50 p-3"><i class="fa-solid fa-snowflake text-blue-600"></i><strong class="block mt-1">Formato</strong><span>Porción individual lista para servir.</span></div>
                                    <div class="rounded-2xl bg-rose-50 p-3"><i class="fa-solid fa-star text-rose-500"></i><strong class="block mt-1">Valor</strong><span>Caramelo artesanal y porción fresca.</span></div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <aside class="mt-7 rounded-3xl border border-oro-200 bg-amber-50 p-5 text-xs text-chocolate-700">
                        <strong class="text-chocolate-900"><i class="fa-solid fa-shield-heart text-oro-600 mr-2"></i>Inocuidad y rotulado</strong>
                        <p class="mt-2">La elaboración y comercialización debe aplicar los requisitos sanitarios de la Resolución 2674 de 2013. Si se vende empacado o envasado con etiqueta, aplica el reglamento de etiquetado nutricional y frontal de la Resolución 810 de 2021, modificada por la Resolución 2492 de 2022. La verificación final depende de la forma real de venta y de la autoridad sanitaria.</p>
                    </aside>
                </div>`;
            simulator.before(section);
        }

        // --- MERCADO OBJETIVO: DECISIONES ÚTILES PARA VENTAS ---
        function refineTargetMarket() {
            const profileTitle = Array.from(document.querySelectorAll('h3')).find((element) => element.textContent.trim() === 'Buyer persona: Valentina');
            const matrixTitle = Array.from(document.querySelectorAll('h3')).find((element) => element.textContent.trim() === 'Matriz de tres competidores');
            const profileCard = profileTitle?.closest('article');
            const matrixCard = matrixTitle?.closest('article');

            if (profileCard) {
                profileCard.innerHTML = `<div class="flex gap-4 items-center"><img src="assets/images/generated/buyer-persona-valentina.png" alt="Ilustración ficticia de Valentina, buyer persona" class="w-20 h-20 rounded-2xl object-cover border border-oro-400/40"><div><h3 class="font-serif text-2xl font-bold">Buyer persona: Valentina</h3><p class="text-oro-400 text-xs mt-1">19 años · estudiante · Bogotá</p></div></div><p class="text-xs text-chocolate-200 mt-5">Perfil ficticio usado para decidir oferta, precio y canal, no representa a una persona real.</p><div class="mt-5 space-y-3 text-xs"><div class="rounded-xl bg-white/10 p-3"><strong class="text-oro-300">Busca:</strong> un postre individual, rico y accesible después de clase.</div><div class="rounded-xl bg-white/10 p-3"><strong class="text-oro-300">Decide por:</strong> fotos del producto, sabores claros, precio visible y pedido rápido.</div><div class="rounded-xl bg-white/10 p-3"><strong class="text-oro-300">Canal:</strong> WhatsApp y punto físico; presupuesto de $5.000 a $12.000 por compra.</div></div>`;
            }

            if (matrixCard) {
                const marketGrid = matrixCard.parentElement;
                marketGrid?.classList.remove('lg:grid-cols-2');
                marketGrid?.classList.add('lg:grid-cols-3');
                matrixCard.innerHTML = `<span class="text-oro-600 text-xs font-bold uppercase">Referencia competitiva</span><h3 class="font-serif text-2xl font-bold mt-2">Tres productos de Bogotá</h3><p class="text-xs text-chocolate-600 mt-2">Una referencia por cada línea de Dulces Zynareth: bomba, copito y quesillo.</p><div class="mt-5 space-y-3 text-xs"><a href="https://www.rappi.com.co/restaurantes/900388509-rose-restaurant-pastry-and-tea" target="_blank" rel="noopener noreferrer" class="block rounded-2xl border border-chocolate-100 p-3 hover:border-oro-400"><strong>Rose Restaurant · Bomba</strong><span class="block text-chocolate-600 mt-1">Bomba de arequipe · $18.590</span><em class="block text-oro-700 mt-1 not-italic">Zynareth: Bomba de arequipe · $5.200</em></a><a href="https://www.rappi.com.co/restaurantes/900005269-randys" target="_blank" rel="noopener noreferrer" class="block rounded-2xl border border-chocolate-100 p-3 hover:border-oro-400"><strong>Randys · Copito</strong><span class="block text-chocolate-600 mt-1">Helado Oreo vasito · $4.500</span><em class="block text-oro-700 mt-1 not-italic">Zynareth: Copito Oreo · $4.000</em></a><a href="https://www.rappi.com.co/restaurantes/900480218-dulcetentacion" target="_blank" rel="noopener noreferrer" class="block rounded-2xl border border-chocolate-100 p-3 hover:border-oro-400"><strong>Dulcetentación · Quesillo</strong><span class="block text-chocolate-600 mt-1">Torta quesillo · $12.000</span><em class="block text-oro-700 mt-1 not-italic">Zynareth: Quesillo individual · $7.000</em></a></div><p class="text-[10px] text-chocolate-500 mt-4">Precios públicos consultados el 30 de agosto de 2026; cada nombre abre su fuente comercial.</p>`;
            }
        }

        function refreshProfitabilityPanel() {
            const sectionTitle = Array.from(document.querySelectorAll('span')).find((element) => element.textContent.includes('G-06 · Rentabilidad'));
            const container = sectionTitle?.closest('div')?.parentElement;
            if (!container) return;
            const subtitle = container.querySelector('p.text-chocolate-600');
            const cards = container.querySelectorAll(':scope > div:nth-of-type(2) article');
            if (subtitle) subtitle.textContent = 'Indicadores recalculados con los cinco costos y precios de las hojas P-02 y P-03; costos fijos y meta de ventas se muestran como escenario académico.';
            const values = [
                ['$2.640', 'por unidad · promedio de ganancia bruta'],
                ['1.103', 'unidades/mes · 37 al día en 30 días'],
                ['~5 meses', 'escenario: 1.800 unidades/mes'],
                ['50,4%', 'margen bruto promedio sobre ventas']
            ];
            cards.forEach((card, index) => {
                const strong = card.querySelector('strong');
                const small = card.querySelector('span');
                if (strong) strong.textContent = values[index][0];
                if (small) small.textContent = values[index][1];
            });
            const method = container.querySelector(':scope > div:nth-of-type(3)');
            if (method) method.innerHTML = '<strong class="text-oro-400">Cómo se calcula:</strong> costos totales de $13.000 y ventas de $26.200 para una unidad de cada producto: la ganancia bruta promedio es $2.640 y el margen bruto promedio 50,4%. Para el escenario académico se conservan costos fijos mensuales estimados de $2.910.000; por eso el punto de equilibrio es 1.103 unidades. Si se venden 1.800 unidades al mes, la utilidad operacional estimada es $1.842.000 y la inversión operativa de $4.870.000 se recuperaría en aproximadamente 3 meses; el indicador de ~5 meses usa el capital social total de $9.958.000. Son proyecciones, no resultados de ventas reales.';
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
            applySchoolBusinessData();
            addTechnicalProductSection();
            initializeTeamPie();
            enhanceCompetitorComparison();
            refineTargetMarket();
            refreshProfitabilityPanel();
        }

