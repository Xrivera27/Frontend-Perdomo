// services/solicitudes.js
const homeUrl = 'http://localhost:3000/api';

const headers = {
  'Content-Type': 'application/json'
};

export default {
  // EMPRESAS
  async fetchEmpresas() {
    try {
      const url = `${homeUrl}/empresas`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener empresas:', error);
      throw error;
    }
  },

  async fetchEmpresaById(id) {
    try {
      const url = `${homeUrl}/empresas/${id}`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener empresa:', error);
      throw error;
    }
  },

  async fetchEmpresasByCategoria(categoriaId) {
    try {
      const url = `${homeUrl}/empresas/categoria/${categoriaId}`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener empresas por categoría:', error);
      throw error;
    }
  },

  async patchEmpresa(id, datosActualizados) {
    try {
      const url = `${homeUrl}/empresas/${id}`;
      const respuesta = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(datosActualizados)
      });

      if (!respuesta.ok) {
        throw new Error(`No se pudo actualizar: ${respuesta.statusText}`);
      }

      return respuesta.ok;
    } catch (error) {
      throw new Error(`Ocurrió un error: ${error}`);
    }
  },

  async desactivarEmpresa(id, datosActualizados) {
    try {
      const url = `${homeUrl}/empresas/desactivar/${id}`;
      const respuesta = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(datosActualizados)
      });

      if (!respuesta.ok) {
        throw new Error(`No se pudo desactivar: ${respuesta.statusText}`);
      }

      return respuesta.ok;
    } catch (error) {
      throw new Error(`Ocurrió un error: ${error.statusText}`);
    }
  },

  async deleteEmpresa(id) {
    try {
      const url = `${homeUrl}/empresas/${id}`;
      const response = await fetch(url, { 
        method: 'DELETE',
        headers 
      });

      if (!response.ok) {
        throw new Error('No se eliminó la empresa ' + response.status);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // USUARIOS
  async fetchUsuarios() {
    try {
      const url = `${homeUrl}/UsuariosP`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },

  async crearUsuario(datosUsuario) {
    try {
      const url = `${homeUrl}/UsuariosP/crear`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(datosUsuario)
      });

      if (!response.ok) {
        throw new Error(`Error al crear usuario: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  },

  async actualizarUsuario(id, datosActualizados) {
    try {
      const url = `${homeUrl}/UsuariosP/actualizar/${id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(datosActualizados)
      });

      if (!response.ok) {
        throw new Error(`No se pudo actualizar: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw new Error(`Ocurrió un error: ${error}`);
    }
  },

  async desactivarUsuario(id, estado) {
    try {
      const url = `${homeUrl}/UsuariosP/desactivar/${id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ estado })
      });

      if (!response.ok) {
        throw new Error(`No se pudo desactivar: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
      throw new Error(`Ocurrió un error: ${error}`);
    }
  },

    // CATEGORIAS EMPRESA
    async fetchCategorias() {
        try {
          const url = `${homeUrl}/categoriaempresaP`;
          const response = await fetch(url, { headers });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
    
          return await response.json();
        } catch (error) {
          console.error('Error al obtener categorías:', error);
          throw error;
        }
      },
    
      async fetchCategoriaById(id) {
        try {
          const url = `${homeUrl}/categoriaempresaP/${id}`;
          const response = await fetch(url, { headers });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
    
          return await response.json();
        } catch (error) {
          console.error('Error al obtener categoría:', error);
          throw error;
        }
      },
    
      async crearCategoria(datosCategoria) {
        try {
          const url = `${homeUrl}/categoriaempresaP`;
          const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(datosCategoria)
          });
    
          if (!response.ok) {
            throw new Error(`Error al crear categoría: ${response.status}`);
          }
    
          return await response.json();
        } catch (error) {
          console.error('Error al crear categoría:', error);
          throw error;
        }
      },
    
      async actualizarCategoria(id, datosActualizados) {
        try {
          const url = `${homeUrl}/categoriaempresaP/${id}`;
          const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(datosActualizados)
          });
    
          if (!response.ok) {
            throw new Error(`No se pudo actualizar la categoría: ${response.statusText}`);
          }
    
          return await response.json();
        } catch (error) {
          console.error('Error al actualizar categoría:', error);
          throw error;
        }
      },
    
      async eliminarCategoria(id) {
        try {
          const url = `${homeUrl}/categoriaempresaP/${id}`;
          const response = await fetch(url, {
            method: 'DELETE',
            headers
          });
    
          if (!response.ok) {
            throw new Error(`No se pudo eliminar la categoría: ${response.status}`);
          }
    
          return true;
        } catch (error) {
          console.error('Error al eliminar categoría:', error);
          throw error;
        }
      }
    
};

