const resolverErrorHandler = (error,resolverName)=>{
    console.log(`Error in ${resolverName} resolver: `,error);
    throw new Error(error.message || "Internal server error");
}
export default resolverErrorHandler;