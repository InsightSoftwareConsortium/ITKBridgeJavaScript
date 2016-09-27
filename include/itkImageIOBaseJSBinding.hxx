/*=========================================================================
 *
 *  Copyright Insight Software Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *=========================================================================*/
#ifndef itkImageIOBaseJSBinding_hxx
#define itkImageIOBaseJSBinding_hxx

#include "itkImageIOBaseJSBinding.h"

#include "itkImageIOBase.h"

namespace itk
{

template< typename TImageIO >
ImageIOBaseJSBinding< TImageIO >
::ImageIOBaseJSBinding()
{
  this->m_ImageIO = ImageIOType::New();
}


template< typename TImageIO >
void
ImageIOBaseJSBinding< TImageIO >
::SetNumberOfDimensions( unsigned int numberOfDimensions )
{
  this->m_ImageIO->SetNumberOfDimensions( numberOfDimensions );
}


template< typename TImageIO >
unsigned int
ImageIOBaseJSBinding< TImageIO >
::GetNumberOfDimensions() const
{
  return this->m_ImageIO->GetNumberOfDimensions();
}


template< typename TImageIO >
void
ImageIOBaseJSBinding< TImageIO >
::SetFileName(std::string fileName)
{
  this->m_ImageIO->SetFileName( fileName );
}


template< typename TImageIO >
std::string
ImageIOBaseJSBinding< TImageIO >
::GetFileName() const
{
  return this->m_ImageIO->GetFileName();
}


template< typename TImageIO >
bool
ImageIOBaseJSBinding< TImageIO >
::CanReadFile( std::string fileName )
{
  return this->m_ImageIO->CanReadFile( fileName.c_str() );
}


template< typename TImageIO >
void
ImageIOBaseJSBinding< TImageIO >
::ReadImageInformation()
{
  return this->m_ImageIO->ReadImageInformation();
}


template< typename TImageIO >
void
ImageIOBaseJSBinding< TImageIO >
::SetDimensions( unsigned int i, unsigned long dimension )
{
  this->m_ImageIO->SetDimensions( i, dimension );
}


template< typename TImageIO >
unsigned long
ImageIOBaseJSBinding< TImageIO >
::GetDimensions( unsigned int i ) const
{
  return this->m_ImageIO->GetDimensions(i);
}


template< typename TImageIO >
void
ImageIOBaseJSBinding< TImageIO >
::SetOrigin( unsigned int i, double dimension )
{
  this->m_ImageIO->SetOrigin( i, dimension );
}


template< typename TImageIO >
double
ImageIOBaseJSBinding< TImageIO >
::GetOrigin( unsigned int i ) const
{
  return this->m_ImageIO->GetOrigin(i);
}


template< typename TImageIO >
void
ImageIOBaseJSBinding< TImageIO >
::SetSpacing( unsigned int i, double dimension )
{
  this->m_ImageIO->SetSpacing( i, dimension );
}


template< typename TImageIO >
double
ImageIOBaseJSBinding< TImageIO >
::GetSpacing( unsigned int i ) const
{
  return this->m_ImageIO->GetSpacing( i );
}


template< typename TImageIO >
typename ImageIOBaseJSBinding< TImageIO >::AxisDirectionType
ImageIOBaseJSBinding< TImageIO >
::GetDirection( unsigned int i ) const
{
  return this->m_ImageIO->GetDirection( i );
}


template< typename TImageIO >
void
ImageIOBaseJSBinding< TImageIO >
::SetDirection( unsigned int i, const AxisDirectionType direction )
{
  return this->m_ImageIO->SetDirection( i, direction );
}


template< typename TImageIO >
void
ImageIOBaseJSBinding< TImageIO >
::SetPixelType( IOPixelType pixelType )
{
  return this->m_ImageIO->SetPixelType( pixelType );
}


template< typename TImageIO >
typename ImageIOBaseJSBinding< TImageIO >::IOPixelType
ImageIOBaseJSBinding< TImageIO >
::GetPixelType() const
{
  return this->m_ImageIO->GetPixelType();
}


template< typename TImageIO >
std::string
ImageIOBaseJSBinding< TImageIO >
::GetPixelTypeAsString( IOPixelType pixelType )
{
  return ImageIOType::GetPixelTypeAsString( pixelType );
}


template< typename TImageIO >
void
ImageIOBaseJSBinding< TImageIO >
::SetComponentType( IOComponentType componentType )
{
  return this->m_ImageIO->SetComponentType( componentType );
}


template< typename TImageIO >
typename ImageIOBaseJSBinding< TImageIO >::IOComponentType
ImageIOBaseJSBinding< TImageIO >
::GetComponentType() const
{
  return this->m_ImageIO->GetComponentType();
}


template< typename TImageIO >
std::string
ImageIOBaseJSBinding< TImageIO >
::GetComponentTypeAsString( IOComponentType componentType )
{
  return ImageIOType::GetComponentTypeAsString( componentType );
}


template< typename TImageIO >
unsigned long
ImageIOBaseJSBinding< TImageIO >
::GetImageSizeInPixels() const
{
  return static_cast< unsigned long >( this->m_ImageIO->GetImageSizeInPixels() );
}


template< typename TImageIO >
unsigned long
ImageIOBaseJSBinding< TImageIO >
::GetImageSizeInBytes() const
{
  return static_cast< unsigned long >( this->m_ImageIO->GetImageSizeInBytes() );
}


template< typename TImageIO >
unsigned long
ImageIOBaseJSBinding< TImageIO >
::GetImageSizeInComponents() const
{
  return static_cast< unsigned long >( this->m_ImageIO->GetImageSizeInComponents() );
}


template< typename TImageIO >
emscripten::val
ImageIOBaseJSBinding< TImageIO >
::Read()
{
  m_PixelBuffer.reserve( this->GetImageSizeInBytes() );
  this->m_ImageIO->Read( reinterpret_cast< void * >( m_PixelBuffer.data() ) );
  const unsigned long components = this->GetImageSizeInComponents();
  switch( this->m_ImageIO->GetComponentType() )
    {
  case itk::ImageIOBase::UCHAR:
      {
      const emscripten::val view( emscripten::typed_memory_view( components, reinterpret_cast< unsigned char * >( m_PixelBuffer.data() ) ) );
      emscripten::val array = emscripten::val::global("Uint8Array");
      emscripten::val buffer = array.new_( components );
      buffer.call<void>( "set", view );
      return buffer;
      }
  case itk::ImageIOBase::CHAR:
      {
      const emscripten::val view( emscripten::typed_memory_view( components, reinterpret_cast< signed char * >( m_PixelBuffer.data() ) ) );
      emscripten::val array = emscripten::val::global("Int8Array");
      emscripten::val buffer = array.new_( components );
      buffer.call<void>( "set", view );
      return buffer;
      }
  case itk::ImageIOBase::USHORT:
      {
      const emscripten::val view( emscripten::typed_memory_view( components, reinterpret_cast< unsigned short * >( m_PixelBuffer.data() ) ) );
      emscripten::val array = emscripten::val::global("Uint16Array");
      emscripten::val buffer = array.new_( components );
      buffer.call<void>( "set", view );
      return buffer;
      }
  case itk::ImageIOBase::SHORT:
      {
      const emscripten::val view( emscripten::typed_memory_view( components, reinterpret_cast< signed short * >( m_PixelBuffer.data() ) ) );
      emscripten::val array = emscripten::val::global("Int16Array");
      emscripten::val buffer = array.new_( components );
      buffer.call<void>( "set", view );
      return buffer;
      }
  case itk::ImageIOBase::UINT:
      {
      const emscripten::val view( emscripten::typed_memory_view( components, reinterpret_cast< unsigned int * >( m_PixelBuffer.data() ) ) );
      emscripten::val array = emscripten::val::global("Uint32Array");
      emscripten::val buffer = array.new_( components );
      buffer.call<void>( "set", view );
      return buffer;
      }
  case itk::ImageIOBase::INT:
      {
      const emscripten::val view( emscripten::typed_memory_view( components, reinterpret_cast< signed int * >( m_PixelBuffer.data() ) ) );
      emscripten::val array = emscripten::val::global("Int32Array");
      emscripten::val buffer = array.new_( components );
      buffer.call<void>( "set", view );
      return buffer;
      }
  case itk::ImageIOBase::ULONG:
      {
      const emscripten::val view( emscripten::typed_memory_view( components, reinterpret_cast< unsigned long * >( m_PixelBuffer.data() ) ) );
      emscripten::val array = emscripten::val::global("Uint64Array");
      emscripten::val buffer = array.new_( components );
      buffer.call<void>( "set", view );
      return buffer;
      }
  case itk::ImageIOBase::LONG:
      {
      const emscripten::val view( emscripten::typed_memory_view( components, reinterpret_cast< signed long * >( m_PixelBuffer.data() ) ) );
      emscripten::val array = emscripten::val::global("Int64Array");
      emscripten::val buffer = array.new_( components );
      buffer.call<void>( "set", view );
      return buffer;
      }
  case itk::ImageIOBase::FLOAT:
      {
      const emscripten::val view( emscripten::typed_memory_view( components, reinterpret_cast< float * >( m_PixelBuffer.data() ) ) );
      emscripten::val array = emscripten::val::global("Float32Array");
      emscripten::val buffer = array.new_( components );
      buffer.call<void>( "set", view );
      return buffer;
      }
  case itk::ImageIOBase::DOUBLE:
      {
      const emscripten::val view( emscripten::typed_memory_view( components, reinterpret_cast< double * >( m_PixelBuffer.data() ) ) );
      emscripten::val array = emscripten::val::global("Float64Array");
      emscripten::val buffer = array.new_( components );
      buffer.call<void>( "set", view );
      return buffer;
      }
  case itk::ImageIOBase::UNKNOWNCOMPONENTTYPE:
  default:
    return emscripten::val::undefined();
    }
}

} // end namespace itk

#endif