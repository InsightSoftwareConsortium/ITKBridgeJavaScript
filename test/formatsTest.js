import test from 'ava'
import path from 'path'

const IntTypes = require(path.resolve(__dirname, '..', 'dist', 'itkIntTypes.js'))
const FloatTypes = require(path.resolve(__dirname, '..', 'dist', 'itkFloatTypes.js'))
const PixelTypes = require(path.resolve(__dirname, '..', 'dist', 'itkPixelTypes.js'))
const readImageLocalFile = require(path.resolve(__dirname, '..', 'dist', 'itkreadImageLocalFile.js'))
const itkConfig = require(path.resolve(__dirname, '..', 'dist', 'itkConfig.js'))
itkConfig.imageIOsPath = path.resolve(__dirname, '..', 'dist', 'itkImageIOs')

test('Test reading a PNG file', t => {
  const testFilePath = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', 'cthead1.png')
  return readImageLocalFile(testFilePath).then(function (image) {
    t.is(image.imageType.dimension, 2, 'dimension')
    t.is(image.imageType.componentType, IntTypes.UInt8, 'componentType')
    t.is(image.imageType.pixelType, PixelTypes.RGB, 'pixelType')
    t.is(image.imageType.components, 3, 'components')
    t.is(image.origin[0], 0.0, 'origin[0]')
    t.is(image.origin[1], 0.0, 'origin[1]')
    t.is(image.spacing[0], 1.0, 'spacing[0]')
    t.is(image.spacing[1], 1.0, 'spacing[1]')
    t.is(image.direction.getElement(0, 0), 1.0, 'direction (0, 0)')
    t.is(image.direction.getElement(0, 1), 0.0, 'direction (0, 1)')
    t.is(image.direction.getElement(1, 0), 0.0, 'direction (1, 0)')
    t.is(image.direction.getElement(1, 1), 1.0, 'direction (1, 1)')
    t.is(image.size[0], 256, 'size[0]')
    t.is(image.size[1], 256, 'size[1]')
    t.is(image.buffer.length, 196608, 'buffer.length')
  })
})

test('Test reading a BMP file', t => {
  const testFilePath = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', 'image_color.bmp')
  return readImageLocalFile(testFilePath).then(function (image) {
    t.is(image.imageType.dimension, 2, 'dimension')
    t.is(image.imageType.componentType, IntTypes.UInt8, 'componentType')
    t.is(image.imageType.pixelType, PixelTypes.RGB, 'pixelType')
    t.is(image.imageType.components, 3, 'components')
    t.is(image.origin[0], 0.0, 'origin[0]')
    t.is(image.origin[1], 0.0, 'origin[1]')
    t.is(image.spacing[0], 1.0, 'spacing[0]')
    t.is(image.spacing[1], 1.0, 'spacing[1]')
    t.is(image.direction.getElement(0, 0), 1.0, 'direction (0, 0)')
    t.is(image.direction.getElement(0, 1), 0.0, 'direction (0, 1)')
    t.is(image.direction.getElement(1, 0), 0.0, 'direction (1, 0)')
    t.is(image.direction.getElement(1, 1), 1.0, 'direction (1, 1)')
    t.is(image.size[0], 31, 'size[0]')
    t.is(image.size[1], 31, 'size[1]')
    t.is(image.buffer.length, 2883, 'buffer.length')
    t.is(image.buffer[1000], 159, 'buffer[1000]')
  })
})

test('Test reading a TIFF file', t => {
  const testFilePath = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', 'ShortTestImage.tiff')
  return readImageLocalFile(testFilePath).then(function (image) {
    t.is(image.imageType.dimension, 2, 'dimension')
    t.is(image.imageType.componentType, IntTypes.Int16, 'componentType')
    t.is(image.imageType.pixelType, PixelTypes.Scalar, 'pixelType')
    t.is(image.imageType.components, 1, 'components')
    t.is(image.origin[0], 0.0, 'origin[0]')
    t.is(image.origin[1], 0.0, 'origin[1]')
    t.is(image.spacing[0], 1.0, 'spacing[0]')
    t.is(image.spacing[1], 1.0, 'spacing[1]')
    t.is(image.direction.getElement(0, 0), 1.0, 'direction (0, 0)')
    t.is(image.direction.getElement(0, 1), 0.0, 'direction (0, 1)')
    t.is(image.direction.getElement(1, 0), 0.0, 'direction (1, 0)')
    t.is(image.direction.getElement(1, 1), 1.0, 'direction (1, 1)')
    t.is(image.size[0], 20, 'size[0]')
    t.is(image.size[1], 20, 'size[1]')
    t.is(image.buffer.length, 400, 'buffer.length')
    t.is(image.buffer[100], -9, 'buffer[100]')
  })
})

test('Test reading a NRRD file', t => {
  const testFilePath = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', 'vol-raw-little.nrrd')
  return readImageLocalFile(testFilePath).then(function (image) {
    t.is(image.imageType.dimension, 3, 'dimension')
    t.is(image.imageType.componentType, FloatTypes.Float64, 'componentType')
    t.is(image.imageType.pixelType, PixelTypes.Scalar, 'pixelType')
    t.is(image.imageType.components, 1, 'components')
    t.is(image.origin[0], 0.0, 'origin[0]')
    t.is(image.origin[1], 0.0, 'origin[1]')
    t.is(image.origin[2], 0.0, 'origin[2]')
    t.is(image.spacing[0], 1.0, 'spacing[0]')
    t.is(image.spacing[1], 1.0, 'spacing[1]')
    t.is(image.spacing[2], 1.0, 'spacing[2]')
    t.is(image.direction.getElement(0, 0), 1.0, 'direction (0, 0)')
    t.is(image.direction.getElement(0, 1), 0.0, 'direction (0, 1)')
    t.is(image.direction.getElement(0, 2), 0.0, 'direction (0, 2)')
    t.is(image.direction.getElement(1, 0), 0.0, 'direction (1, 0)')
    t.is(image.direction.getElement(1, 1), 1.0, 'direction (1, 1)')
    t.is(image.direction.getElement(1, 2), 0.0, 'direction (1, 2)')
    t.is(image.direction.getElement(2, 0), 0.0, 'direction (2, 0)')
    t.is(image.direction.getElement(2, 1), 0.0, 'direction (2, 1)')
    t.is(image.direction.getElement(2, 2), 1.0, 'direction (2, 2)')
    t.is(image.size[0], 5, 'size[0]')
    t.is(image.size[1], 6, 'size[1]')
    t.is(image.size[2], 7, 'size[2]')
    t.is(image.buffer.length, 210, 'buffer.length')
    t.is(image.buffer[2], 5.0, 'buffer[2]')
  })
})

test('Test reading a DICOM file', t => {
  const testFilePath = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', '1.3.6.1.4.1.5962.99.1.3814087073.479799962.1489872804257.100.0.dcm')
  return readImageLocalFile(testFilePath).then(function (image) {
    t.is(image.imageType.dimension, 3, 'dimension')
    t.is(image.imageType.componentType, IntTypes.Int16, 'componentType')
    t.is(image.imageType.pixelType, PixelTypes.Scalar, 'pixelType')
    t.is(image.imageType.components, 1, 'components')
    t.is(image.origin[0], -32.9551, 'origin[0]')
    t.is(image.origin[1], -133.9286, 'origin[1]')
    t.is(image.origin[2], 116.7857, 'origin[2]')
    t.is(image.spacing[0], 1.0, 'spacing[0]')
    t.is(image.spacing[1], 1.0, 'spacing[1]')
    t.is(image.spacing[2], 1.0, 'spacing[2]')
    t.is(image.direction.getElement(0, 0), 0.0, 'direction (0, 0)')
    t.is(image.direction.getElement(0, 1), 0.0, 'direction (0, 1)')
    t.is(image.direction.getElement(0, 2), -1.0, 'direction (0, 2)')
    t.is(image.direction.getElement(1, 0), 1.0, 'direction (1, 0)')
    t.is(image.direction.getElement(1, 1), 0.0, 'direction (1, 1)')
    t.is(image.direction.getElement(1, 2), 0.0, 'direction (1, 2)')
    t.is(image.direction.getElement(2, 0), 0.0, 'direction (2, 0)')
    t.is(image.direction.getElement(2, 1), -1.0, 'direction (2, 1)')
    t.is(image.direction.getElement(2, 2), 0.0, 'direction (2, 2)')
    t.is(image.size[0], 256, 'size[0]')
    t.is(image.size[1], 256, 'size[1]')
    t.is(image.size[2], 1, 'size[2]')
    t.is(image.buffer.length, 65536, 'buffer.length')
    t.is(image.buffer[1000], 3, 'buffer[1000]')
  })
})

test('Test reading a VTK legacy file', t => {
  const testFilePath = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', 'ironProt.vtk')
  return readImageLocalFile(testFilePath).then(function (image) {
    t.is(image.imageType.dimension, 3, 'dimension')
    t.is(image.imageType.componentType, IntTypes.UInt8, 'componentType')
    t.is(image.imageType.pixelType, PixelTypes.Scalar, 'pixelType')
    t.is(image.imageType.components, 1, 'components')
    t.is(image.origin[0], 0.0, 'origin[0]')
    t.is(image.origin[1], 0.0, 'origin[1]')
    t.is(image.origin[2], 0.0, 'origin[2]')
    t.is(image.spacing[0], 1.0, 'spacing[0]')
    t.is(image.spacing[1], 1.0, 'spacing[1]')
    t.is(image.spacing[2], 1.0, 'spacing[2]')
    t.is(image.direction.getElement(0, 0), 1.0, 'direction (0, 0)')
    t.is(image.direction.getElement(0, 1), 0.0, 'direction (0, 1)')
    t.is(image.direction.getElement(0, 2), 0.0, 'direction (0, 2)')
    t.is(image.direction.getElement(1, 0), 0.0, 'direction (1, 0)')
    t.is(image.direction.getElement(1, 1), 1.0, 'direction (1, 1)')
    t.is(image.direction.getElement(1, 2), 0.0, 'direction (1, 2)')
    t.is(image.direction.getElement(2, 0), 0.0, 'direction (2, 0)')
    t.is(image.direction.getElement(2, 1), 0.0, 'direction (2, 1)')
    t.is(image.direction.getElement(2, 2), 1.0, 'direction (2, 2)')
    t.is(image.size[0], 68, 'size[0]')
    t.is(image.size[1], 68, 'size[1]')
    t.is(image.size[2], 68, 'size[2]')
    t.is(image.buffer.length, 314432, 'buffer.length')
    t.is(image.buffer[1000], 0, 'buffer[1000]')
  })
})

test('Test reading a MetaImage file', t => {
  const testFilePath = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', 'brainweb165a10f17.mha')
  return readImageLocalFile(testFilePath).then(function (image) {
    t.is(image.imageType.dimension, 3, 'dimension')
    t.is(image.imageType.componentType, IntTypes.UInt8, 'componentType')
    t.is(image.imageType.pixelType, PixelTypes.Scalar, 'pixelType')
    t.is(image.imageType.components, 1, 'components')
    t.is(image.origin[0], 0.0, 'origin[0]')
    t.is(image.origin[1], 0.0, 'origin[1]')
    t.is(image.origin[2], 0.0, 'origin[2]')
    t.is(image.spacing[0], 1.0, 'spacing[0]')
    t.is(image.spacing[1], 1.0, 'spacing[1]')
    t.is(image.spacing[2], 1.0, 'spacing[2]')
    t.is(image.direction.getElement(0, 0), 1.0, 'direction (0, 0)')
    t.is(image.direction.getElement(0, 1), 0.0, 'direction (0, 1)')
    t.is(image.direction.getElement(0, 2), 0.0, 'direction (0, 2)')
    t.is(image.direction.getElement(1, 0), 0.0, 'direction (1, 0)')
    t.is(image.direction.getElement(1, 1), 1.0, 'direction (1, 1)')
    t.is(image.direction.getElement(1, 2), 0.0, 'direction (1, 2)')
    t.is(image.direction.getElement(2, 0), 0.0, 'direction (2, 0)')
    t.is(image.direction.getElement(2, 1), 0.0, 'direction (2, 1)')
    t.is(image.direction.getElement(2, 2), 1.0, 'direction (2, 2)')
    t.is(image.size[0], 181, 'size[0]')
    t.is(image.size[1], 217, 'size[1]')
    t.is(image.size[2], 180, 'size[2]')
    t.is(image.buffer.length, 7069860, 'buffer.length')
    t.is(image.buffer[1000], 0, 'buffer[1000]')
  })
})

test('Test reading a Nifti file', t => {
  const testFilePath = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', 'r16slice.nii.gz')
  return readImageLocalFile(testFilePath).then(function (image) {
    t.is(image.imageType.dimension, 2, 'dimension')
    t.is(image.imageType.componentType, FloatTypes.Float32, 'componentType')
    t.is(image.imageType.pixelType, PixelTypes.Scalar, 'pixelType')
    t.is(image.imageType.components, 1, 'components')
    t.is(image.origin[0], 0.0, 'origin[0]')
    t.is(image.origin[1], 0.0, 'origin[1]')
    t.is(image.spacing[0], 1.0, 'spacing[0]')
    t.is(image.spacing[1], 1.0, 'spacing[1]')
    t.is(image.direction.getElement(0, 0), 1.0, 'direction (0, 0)')
    t.is(image.direction.getElement(0, 1), 0.0, 'direction (0, 1)')
    t.is(image.direction.getElement(1, 0), 0.0, 'direction (1, 0)')
    t.is(image.direction.getElement(1, 1), -1.0, 'direction (1, 1)')
    t.is(image.size[0], 256, 'size[0]')
    t.is(image.size[1], 256, 'size[1]')
    t.is(image.buffer.length, 65536, 'buffer.length')
    t.is(image.buffer[1000], 3468.88525390625, 'buffer[1000]')
  })
})
