const generarId = ()=>{
    const fecha = Date.now().toString(32);
    const random = Math.random().toString(32).substring(2);
    return fecha + random;
}
export default generarId;