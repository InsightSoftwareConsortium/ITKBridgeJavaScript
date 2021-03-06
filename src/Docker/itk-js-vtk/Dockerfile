ARG CMAKE_BUILD_TYPE=Release
ARG BASE_TAG=latest

FROM insighttoolkit/itk-js:$BASE_TAG
MAINTAINER Insight Software Consortium <community@itk.org>

WORKDIR /

# Work-around for VTK HDF5 build
ENV CMAKE_TOOLCHAIN_FILE ${CMAKE_TOOLCHAIN_FILE_DOCKCROSS}
# 2020-04-28 master + VTK HDF5
ENV VTK_GIT_TAG 02b7dc072a68d109d7d6670225e09ffc29765301
RUN git clone https://github.com/thewtex/VTK.git && \
  cd VTK && \
  git checkout ${VTK_GIT_TAG} && \
  cd ../ && \
  mkdir VTK-build && \
  cd VTK-build && \
  cmake \
    -G Ninja \
    -DCMAKE_BUILD_TYPE:STRING=$CMAKE_BUILD_TYPE \
    -DBUILD_SHARED_LIBS:BOOL=OFF \
    -DCMAKE_TOOLCHAIN_FILE=${CMAKE_TOOLCHAIN_FILE} \
    -DCMAKE_INSTALL_PREFIX:PATH=/install-prefix \
    -DVTK_ENABLE_LOGGING:BOOL=OFF \
    -DVTK_ENABLE_WRAPPING:BOOL=OFF \
    -DVTK_ENABLE_KITS:BOOL=OFF \
    -DVTK_LEGACY_REMOVE:BOOL=ON \
    -DVTK_OPENGL_USE_GLES:BOOL=ON \
    -DVTK_USE_SDL2:BOOL=ON \
    -DVTK_NO_PLATFORM_SOCKETS:BOOL=ON \
    -DBUILD_TESTING:BOOL=OFF \
    -DVTK_MODULE_ENABLE_VTK_IOExodus:STRING=YES \
    -DH5_HAVE_GETPWUID:BOOL=OFF \
    ../VTK && \
  ninja -j7 && \
  find . -name '*.o' -delete && \
  cd .. && chmod -R 777 VTK-build

# 2020-04-29
ENV ITKVtkGlue_GIT_TAG f4df3da42944519872df463cc55d9ea8929ea6a2
RUN git clone https://github.com/InsightSoftwareConsortium/ITKVtkGlue.git && \
  cd ITKVtkGlue && \
  git checkout ${ITKVtkGlue_GIT_TAG} && \
  cd ../ && \
  mkdir ITKVtkGlue-build && \
  cd ITKVtkGlue-build && \
  cmake \
    -G Ninja \
    -DCMAKE_BUILD_TYPE:STRING=$CMAKE_BUILD_TYPE \
    -DBUILD_SHARED_LIBS:BOOL=OFF \
    -DCMAKE_TOOLCHAIN_FILE=${CMAKE_TOOLCHAIN_FILE} \
    -DCMAKE_INSTALL_PREFIX:PATH=/install-prefix \
    -DBUILD_TESTING:BOOL=OFF \
    -DITK_DIR:PATH=/ITK-build \
    -DVTK_DIR:PATH=/VTK-build \
    ../ITKVtkGlue && \
  ninja -j7 && \
  find . -name '*.o' -delete && \
  cd .. && chmod -R 777 ITK-build

# Reset
ENV CMAKE_TOOLCHAIN_FILE ${CMAKE_TOOLCHAIN_FILE_ITK}

# Build-time metadata as defined at http://label-schema.org
ARG BUILD_DATE
ARG IMAGE=kitware/itk-js-vtk
ARG VERSION=latest
ARG VCS_REF
ARG VCS_URL
LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name=$IMAGE \
      org.label-schema.version=$VERSION \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url=$VCS_URL \
      org.label-schema.schema-version="1.0"
ENV DEFAULT_DOCKCROSS_IMAGE ${IMAGE}:${VERSION}
WORKDIR /work
WORKDIR /work
