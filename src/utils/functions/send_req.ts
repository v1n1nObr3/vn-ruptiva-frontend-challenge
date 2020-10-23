//---------------------------------------------------------------------------------------
const sendRequest = async (path: string, payload: any) => {
  
  console.log(process.env.REACT_APP_BACKEND!);
  
  const url = process.env.REACT_APP_BACKEND! + path;

  const body = JSON.stringify(payload);

  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const envelope: RequestInit = {
    method: 'POST',
    headers,
    body,
    mode: 'cors',
    credentials: 'include'
  };

  const request = new Request(url, envelope);

  try {
    const response = await fetch(request);
    return await response.json();
  }
  
  catch (err) {
    return await Promise.resolve<Error>(err);
  }
  
};
//---------------------------------------------------------------------------------------

export default sendRequest;
