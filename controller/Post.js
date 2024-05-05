exports.post = async (req, res) => {
    try {
      const {page}=req.body;
       const s=page*10;
      const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${s}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      console.log(data);
      res.status(200).json({success:true,message:"fetched post successfully",data});// Sending the fetched data as response
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      res.status(500).json({ success:false,error: 'Internal Server Error' }); // Sending error response
    }
  };