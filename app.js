$(() => {
    const inputID = $("#inputID")
    const formulario = $("#formulario")
    const resultadoCard = $("#resultadoCard")
    const chartContainer = $("#chartContainer")


    formulario.on("submit", (e) => {
        e.preventDefault();
        resultadoCard.html("")
        chartContainer.html("")
        

        const regSoloNum = /^[0-9]+$/;

        console.log(inputID.val());
        if (!regSoloNum.test(inputID.val())){

       
            return alert("deben ser solo numeros")

        };
        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${inputID.val()}`,
            type: "GET",
            dataType: "JSON",

            success(data) {
               
                console.log(data);
                console.log(data.image.url);
                const alianzas = data.biography.aliases.map(ali =>{
                    return ali
                })
        
                console.log(alianzas);

                resultadoCard.append(`
                <section  class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${data.image.url}" 
                        class="img-fluid rounded-start" alt="ash">
                        </div>
                        <div class="col-md-8">
                            <div class="card-header">
                            ${data.name}
                            </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><i>Conexiones</i>: ${data.connections["group-affiliation"]} -<br> <i>Publicado por</i>: <b>${data.biography.publisher}</b></br></li>
                            <li class="list-group-item"><i>Ocupacion</i>: ${data.work.occupation}</li>
                            <li class="list-group-item"><i>Primera Aparicion</i>: ${data.work.occupation}</li>
                            <li class="list-group-item"><i>Altura</i>: ${data.appearance.height[0]} - ${data.appearance.height[1]}</li>
                            <li class="list-group-item"><i>Peso</i>: ${data.appearance.weight[0]} - ${data.appearance.weight[1]}</li>
                            <li class="list-group-item"><i>Alianzas</i>: ${alianzas}</li>
                        </ul>
                        
                        </div>
                    </div>
                </section>
                `)
                const opciones = {
                    animationEnabled: true,
                    title: {
                        text: `Estadisticas de Combate de ${data.name}`
                    },
    
                    data: [
                        {
                            type: "pie",
                            showInLegend: true,
			                legendText: "{indexLabel}",
                            dataPoints: [
                                { y: data.powerstats.combat, indexLabel: `Combate (${data.powerstats.combat})` },
                                { y: data.powerstats.durability, indexLabel: `Durability (${data.powerstats.durability})` },
                                { y: data.powerstats.intelligence, indexLabel: `Intelligence (${data.powerstats.intelligence})`},
                                { y: data.powerstats.power, indexLabel: `Power (${data.powerstats.power})`},
                                { y: data.powerstats.speed, indexLabel: `Speed (${data.powerstats.speed})` },
                                { y: data.powerstats.strength, indexLabel: `Strength (${data.powerstats.strength})`},
                            ]
                        }
                    ]
                };
                chartContainer.CanvasJSChart(opciones);
            },
            error(err) {
                console.log(err);
            }

        })

    })
})

